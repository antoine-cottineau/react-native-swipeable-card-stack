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
import { type RenderCardAddedProps } from './RenderCardProps'
import { type SwipeDirection } from './SwipeDirection'
import { type SwipeStatus } from './SwipeUpdate'
import { type SwipeableCardRef } from './SwipeableCardStack'
import { type SwipeableCardStackOptions } from './SwipeableCardStackOptions'
import { shouldValidateSwipe } from './shouldValidateSwipe'
import { swipeDirectionAnimationPositionMapping } from './swipeDirectionAnimationPositionMapping'

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
  const animationPosition = useSharedValue(
    initialSwipeDirection === undefined
      ? 0
      : swipeDirectionAnimationPositionMapping[initialSwipeDirection],
  )

  const isActive = index === currentIndex

  useImperativeHandle(ref, () => ({
    swipeLeft: () => {
      animationPosition.value = withTiming(
        -1,
        options.imperativeSwipeAnimationConfig,
        () => {
          runOnJS(onCardSwipeStatusUpdated)({
            direction: 'left',
            phase: 'validated',
          })
          runOnJS(onCardSwipeStatusUpdated)({
            direction: 'left',
            phase: 'ended',
          })
        },
      )
    },
    swipeRight: () => {
      animationPosition.value = withTiming(
        1,
        options.imperativeSwipeAnimationConfig,
        () => {
          runOnJS(onCardSwipeStatusUpdated)({
            direction: 'right',
            phase: 'validated',
          })
          runOnJS(onCardSwipeStatusUpdated)({
            direction: 'right',
            phase: 'ended',
          })
        },
      )
    },
    unswipe: () => {
      animationPosition.value = withTiming(0, options.unswipeAnimationConfig)
    },
  }))

  const panGesture = Gesture.Pan()
    .onStart(({ translationX }) => {
      runOnJS(onCardSwipeStatusUpdated)({
        direction: translationX > 0 ? 'right' : 'left',
        phase: 'started',
      })
    })
    .onUpdate(({ translationX }) => {
      animationPosition.value = translationX / options.endedSwipePosition
    })
    .onEnd((payload) => {
      const direction: SwipeDirection =
        payload.translationX > 0 ? 'right' : 'left'
      if (
        shouldValidateSwipe({
          translation: payload.translationX,
          velocity: payload.velocityX,
          validateSwipeTranslationThreshold:
            options.validateSwipeTranslationThreshold,
          validateSwipeVelocityThreshold:
            options.validateSwipeTranslationThreshold,
        })
      ) {
        runOnJS(onCardSwipeStatusUpdated)({ direction, phase: 'validated' })
        animationPosition.value = withSpring(
          Math.sign(payload.translationX),
          options.validatedSwipeAnimationConfig(payload),
          () => {
            runOnJS(onCardSwipeStatusUpdated)({
              direction,
              phase: 'ended',
            })
          },
        )

        return
      }

      animationPosition.value = withTiming(
        0,
        options.stoppedSwipeAnimationConfig,
        () => {
          runOnJS(onCardSwipeStatusUpdated)({ direction, phase: 'stopped' })
        },
      )
    })
    .enabled(isActive)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: animationPosition.value * options.endedSwipePosition,
      },
    ],
  }))

  useAnimatedReaction(
    () =>
      isActive &&
      Math.abs(animationPosition.value) >
        options.validateSwipeTranslationThreshold,
    (newValue, previousValue) => {
      if (previousValue === null || newValue === previousValue) {
        return
      }

      const direction: SwipeDirection =
        animationPosition.value > 0 ? 'right' : 'left'
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
        {renderCard({ index, animationPosition, currentIndex })}
      </GestureDetector>
    </Container>
  )
})

const Container = styled(Animated.View)({
  height: '100%',
  width: '100%',
  position: 'absolute',
})
