import {
  forwardRef,
  useImperativeHandle,
  type ForwardedRef,
  type ReactNode,
} from 'react'
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated'
import { type SwipeableCardRef } from '..'
import { type CardStatus } from '../domain/CardStatus'
import { type RenderCardAddedProps } from '../domain/RenderCardProps'
import { type SwipeAxis } from '../domain/SwipeAxis'
import { extractPropValue } from '../domain/SwipeAxisDependentProp'
import {
  swipeDirectionAxisMapping,
  type SwipeDirection,
} from '../domain/SwipeDirection'
import { type SwipeStatus } from '../domain/SwipeUpdate'
import { getSwipeDirection } from '../domain/getSwipeDirection'
import { isSwipeLocked } from '../domain/isSwipeLocked'
import { shouldValidateSwipe } from '../domain/shouldValidateSwipe'
import { swipeDirectionAnimationPositionMapping } from '../domain/swipeDirectionAnimationPositionMapping'
import { type SwipeableCardStackOptions } from './SwipeableCardStackOptions'
import { useThresholdEventSender } from './useThresholdEventSender'

type SwipeableCardWrapperProps = {
  renderCard: (params: RenderCardAddedProps) => ReactNode
  index: number
  status: CardStatus
  cardWrapperStyle: StyleProp<ViewStyle>
  onCardSwipeStatusUpdated: (swipeStatus: SwipeStatus) => void
  options: SwipeableCardStackOptions
  initialSwipeDirection?: SwipeDirection
}

export const SwipeableCardWrapper = forwardRef(function SwipeableCardWrapper(
  {
    renderCard,
    cardWrapperStyle,
    onCardSwipeStatusUpdated,
    index,
    status,
    options,
    initialSwipeDirection,
  }: SwipeableCardWrapperProps,
  ref: ForwardedRef<SwipeableCardRef>,
) {
  const xAnimationPosition = useSharedValue(
    getSwipeSharedValueInitialValue(initialSwipeDirection, 'x'),
  )
  const yAnimationPosition = useSharedValue(
    getSwipeSharedValueInitialValue(initialSwipeDirection, 'y'),
  )

  const xEndedSwipePosition = extractPropValue(options.endedSwipePosition, 'x')
  const yEndedSwipePosition = extractPropValue(options.endedSwipePosition, 'y')
  const validateSwipeXTranslationThreshold = extractPropValue(
    options.validateSwipeTranslationThreshold,
    'x',
  )
  const validateSwipeYTranslationThreshold = extractPropValue(
    options.validateSwipeTranslationThreshold,
    'y',
  )

  useThresholdEventSender({
    isActive: status === 'current',
    xAnimationPosition,
    yAnimationPosition,
    xAnimationThreshold:
      validateSwipeXTranslationThreshold / xEndedSwipePosition,
    yAnimationThreshold:
      validateSwipeYTranslationThreshold / yEndedSwipePosition,
    onCardSwipeStatusUpdated,
  })

  useImperativeHandle(ref, () => ({
    swipe: (direction) => {
      const targetAnimationPosition = withTiming(
        swipeDirectionAnimationPositionMapping[direction],
        extractPropValue(
          options.imperativeSwipeAnimationConfig,
          swipeDirectionAxisMapping[direction],
        ),
        () => {
          runOnJS(onCardSwipeStatusUpdated)({
            direction,
            phase: 'validated',
          })
          runOnJS(onCardSwipeStatusUpdated)({
            direction,
            phase: 'ended',
          })
        },
      )
      if (swipeDirectionAxisMapping[direction] === 'x') {
        xAnimationPosition.value = targetAnimationPosition
      } else {
        yAnimationPosition.value = targetAnimationPosition
      }
    },
    unswipe: () => {
      xAnimationPosition.value = withTiming(
        0,
        extractPropValue(options.unswipeAnimationConfig, 'x'),
      )
      yAnimationPosition.value = withTiming(
        0,
        extractPropValue(options.unswipeAnimationConfig, 'y'),
      )
    },
  }))

  const panGesture = Gesture.Pan()
    .onStart(({ translationX }) => {
      runOnJS(onCardSwipeStatusUpdated)({
        direction: translationX > 0 ? 'right' : 'left',
        phase: 'started',
      })
    })
    .onUpdate(({ translationX, translationY }) => {
      if (
        !isSwipeLocked({
          translation: translationX,
          axis: 'x',
          lockedDirections: options.lockedDirections,
        })
      ) {
        xAnimationPosition.value = translationX / xEndedSwipePosition
      }
      if (
        !isSwipeLocked({
          translation: translationY,
          axis: 'y',
          lockedDirections: options.lockedDirections,
        })
      ) {
        yAnimationPosition.value = translationY / yEndedSwipePosition
      }
    })
    .onEnd((payload) => {
      const { translationX, translationY, velocityX, velocityY } = payload
      const direction = getSwipeDirection({
        xTranslation: translationX,
        yTranslation: translationY,
        xEndedSwipePosition,
        yEndedSwipePosition,
      })

      const axis = swipeDirectionAxisMapping[direction]
      const translation = axis === 'x' ? translationX : translationY
      const velocity = axis === 'x' ? velocityX : velocityY
      const translationThreshold =
        axis === 'x'
          ? validateSwipeXTranslationThreshold
          : validateSwipeYTranslationThreshold
      const velocityThreshold = extractPropValue(
        options.validateSwipeVelocityThreshold,
        axis,
      )

      if (
        shouldValidateSwipe({
          translation,
          velocity,
          translationThreshold,
          velocityThreshold,
          axis,
          lockedDirections: options.lockedDirections,
        })
      ) {
        runOnJS(onCardSwipeStatusUpdated)({ direction, phase: 'validated' })
        const targetAnimationPosition = withSpring(
          swipeDirectionAnimationPositionMapping[direction],
          extractPropValue(
            options.validatedSwipeAnimationConfig,
            axis,
          )(payload),
          () => {
            runOnJS(onCardSwipeStatusUpdated)({
              direction,
              phase: 'ended',
            })
          },
        )
        if (axis === 'x') {
          xAnimationPosition.value = targetAnimationPosition
        } else {
          yAnimationPosition.value = targetAnimationPosition
        }
        return
      }

      runOnJS(onCardSwipeStatusUpdated)({ direction, phase: 'stopped' })

      const targetAnimationPosition = withTiming(
        0,
        extractPropValue(options.stoppedSwipeAnimationConfig, axis),
      )

      xAnimationPosition.value = targetAnimationPosition
      yAnimationPosition.value = targetAnimationPosition
    })
    .enabled(status === 'current')
    .withTestId(`swipeable-card-wrapper-${index}-gesture`)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: xAnimationPosition.value * xEndedSwipePosition,
      },
      {
        translateY: yAnimationPosition.value * yEndedSwipePosition,
      },
    ],
  }))

  return (
    <Animated.View
      style={[styles.container, cardWrapperStyle, animatedStyle]}
      testID={`swipeable-card-wrapper-${index}`}
    >
      <GestureDetector gesture={panGesture}>
        {renderCard({
          index,
          status,
          xAnimationPosition,
          yAnimationPosition,
        })}
      </GestureDetector>
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  container: { height: '100%', width: '100%', position: 'absolute' },
})

const getSwipeSharedValueInitialValue = (
  initialSwipeDirection: SwipeDirection | undefined,
  wantedSwipeAxis: SwipeAxis,
) => {
  if (initialSwipeDirection === undefined) {
    return 0
  }
  if (swipeDirectionAxisMapping[initialSwipeDirection] === wantedSwipeAxis) {
    return swipeDirectionAnimationPositionMapping[initialSwipeDirection]
  }
  return 0
}
