import styled from '@emotion/native'
import {
  forwardRef,
  useImperativeHandle,
  type ForwardedRef,
  type ReactNode,
} from 'react'
import { type StyleProp, type ViewStyle } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated'
import { type SwipeableCardRef } from '..'
import { type RenderCardAddedProps } from '../domain/RenderCardProps'
import { type SwipeAxis } from '../domain/SwipeAxis'
import { extractSwipeAxisDependentPropValue } from '../domain/SwipeAxisDependentProp'
import {
  swipeDirectionAxisMapping,
  type SwipeDirection,
} from '../domain/SwipeDirection'
import { type SwipeStatus } from '../domain/SwipeUpdate'
import { getSwipeDirection } from '../domain/getSwipeDirection'
import { shouldValidateSwipe } from '../domain/shouldValidateSwipe'
import { swipeDirectionAnimationPositionMapping } from '../domain/swipeDirectionAnimationPositionMapping'
import { type SwipeableCardStackOptions } from './SwipeableCardStackOptions'
import { useThresholdEventSender } from './useThresholdEventSender'

type SwipeableCardWrapperProps = {
  renderCard: (params: RenderCardAddedProps) => ReactNode
  index: number
  currentIndex: number
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
    currentIndex,
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

  const xEndedSwipePosition = extractSwipeAxisDependentPropValue(
    options.endedSwipePosition,
    'x',
  )
  const yEndedSwipePosition = extractSwipeAxisDependentPropValue(
    options.endedSwipePosition,
    'y',
  )
  const validateSwipeXTranslationThreshold = extractSwipeAxisDependentPropValue(
    options.validateSwipeTranslationThreshold,
    'x',
  )
  const validateSwipeYTranslationThreshold = extractSwipeAxisDependentPropValue(
    options.validateSwipeTranslationThreshold,
    'y',
  )
  const validateSwipeXVelocityThreshold = extractSwipeAxisDependentPropValue(
    options.validateSwipeVelocityThreshold,
    'x',
  )
  const validateSwipeYVelocityThreshold = extractSwipeAxisDependentPropValue(
    options.validateSwipeVelocityThreshold,
    'y',
  )

  const isActive = index === currentIndex

  useThresholdEventSender({
    isActive,
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
        options.imperativeSwipeAnimationConfig,
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
      xAnimationPosition.value = withTiming(0, options.unswipeAnimationConfig)
      yAnimationPosition.value = withTiming(0, options.unswipeAnimationConfig)
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
      const canUpdateXPosition =
        (!options.lockedDirections.includes('left') && translationX < 0) ||
        (!options.lockedDirections.includes('right') && translationX > 0)
      const canUpdateYPosition =
        (!options.lockedDirections.includes('top') && translationY < 0) ||
        (!options.lockedDirections.includes('bottom') && translationY > 0)
      if (canUpdateXPosition) {
        xAnimationPosition.value = translationX / xEndedSwipePosition
      }
      if (canUpdateYPosition) {
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
      const velocityThreshold =
        axis === 'x'
          ? validateSwipeXVelocityThreshold
          : validateSwipeYVelocityThreshold

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
          options.validatedSwipeAnimationConfig(payload),
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
        options.stoppedSwipeAnimationConfig,
      )

      xAnimationPosition.value = targetAnimationPosition
      yAnimationPosition.value = targetAnimationPosition
    })
    .enabled(isActive)

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
    <Container style={[cardWrapperStyle, animatedStyle]}>
      <GestureDetector gesture={panGesture}>
        {renderCard({
          index,
          xAnimationPosition,
          currentIndex,
        })}
      </GestureDetector>
    </Container>
  )
})

const Container = styled(Animated.View)({
  height: '100%',
  width: '100%',
  position: 'absolute',
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
