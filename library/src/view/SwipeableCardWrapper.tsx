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
  useAnimatedReaction,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated'
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
import { type SwipeableCardRef } from './SwipeableCardStack'
import { type SwipeableCardStackOptions } from './SwipeableCardStackOptions'

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
      xAnimationPosition.value = translationX / xEndedSwipePosition
      yAnimationPosition.value = translationY / yEndedSwipePosition
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

      const targetAnimationPosition = withTiming(
        0,
        options.stoppedSwipeAnimationConfig,
        () => {
          runOnJS(onCardSwipeStatusUpdated)({ direction, phase: 'stopped' })
        },
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

  useAnimatedReaction(
    () =>
      isActive &&
      Math.abs(xAnimationPosition.value) >
        validateSwipeXTranslationThreshold / xEndedSwipePosition,
    (newValue, previousValue) => {
      if (previousValue === null || newValue === previousValue) {
        return
      }

      const direction: SwipeDirection =
        xAnimationPosition.value > 0 ? 'right' : 'left'
      if (newValue) {
        runOnJS(onCardSwipeStatusUpdated)({
          direction,
          phase: 'above-threshold',
        })
      } else {
        runOnJS(onCardSwipeStatusUpdated)({
          direction,
          phase: 'below-threshold',
        })
      }
    },
  )

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
