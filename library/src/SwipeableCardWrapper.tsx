import styled from '@emotion/native'
import {
  forwardRef,
  useImperativeHandle,
  type ForwardedRef,
  type ReactNode,
} from 'react'
import { Dimensions, type StyleProp, type ViewStyle } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  withSpring,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated'
import { type RenderCardAddedProps } from './RenderCardProps'
import { type SwipeDirection } from './SwipeDirection'
import { type SwipeStatus } from './SwipeUpdate'
import { type SwipeableCardRef } from './SwipeableCardStack'
import { type SwipeableCardStackOptions } from './SwipeableCardStackOptions'
import { shouldValidateSwipe } from './shouldValidateSwipe'

type SwipeableCardWrapperProps = {
  renderCard: (params: RenderCardAddedProps) => ReactNode
  index: number
  animationPosition: SharedValue<number>
  currentIndex: number
  cardWrapperStyle: StyleProp<ViewStyle>
  onCardSwipeStatusUpdated: (swipeStatus: SwipeStatus) => void
  options: SwipeableCardStackOptions
}

export const SwipeableCardWrapper = forwardRef(function SwipeableCardWrapper(
  {
    renderCard,
    animationPosition,
    cardWrapperStyle,
    onCardSwipeStatusUpdated,
    index,
    currentIndex,
    options,
  }: SwipeableCardWrapperProps,
  ref: ForwardedRef<SwipeableCardRef>,
) {
  const width = Dimensions.get('window').width
  const isActive = index === currentIndex

  useImperativeHandle(ref, () => ({
    swipeLeft: () => {
      animationPosition.value = withTiming(
        -options.endedSwipeAnimationPosition,
        undefined,
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
        options.endedSwipeAnimationPosition,
        undefined,
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
  }))

  const panGesture = Gesture.Pan()
    .onStart(({ translationX }) => {
      runOnJS(onCardSwipeStatusUpdated)({
        direction: translationX > 0 ? 'right' : 'left',
        phase: 'started',
      })
    })
    .onUpdate(({ translationX }) => {
      animationPosition.value = translationX / width
    })
    .onEnd(({ translationX, velocityX }) => {
      const direction: SwipeDirection = translationX > 0 ? 'right' : 'left'
      if (
        shouldValidateSwipe({
          animationPosition: animationPosition.value,
          velocity: velocityX,
          validateSwipeAnimationPositionThreshold:
            options.validateSwipeAnimationPositionThreshold,
          validateSwipeVelocityThreshold:
            options.validateSwipeVelocityThreshold,
        })
      ) {
        runOnJS(onCardSwipeStatusUpdated)({ direction, phase: 'validated' })
        animationPosition.value = withSpring(
          Math.sign(translationX) * options.endedSwipeAnimationPosition,
          {
            velocity: 0.0001 * velocityX,
            mass: 1,
            damping: 100,
            stiffness: 200,
          },
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
        {
          easing: Easing.inOut(Easing.ease),
        },
        () => {
          runOnJS(onCardSwipeStatusUpdated)({ direction, phase: 'stopped' })
        },
      )
    })
    .enabled(isActive)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: isActive ? animationPosition.value * width : 0 }],
  }))

  useAnimatedReaction(
    () =>
      isActive &&
      Math.abs(animationPosition.value) >
        options.validateSwipeAnimationPositionThreshold,
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
    <OuterContainer style={cardWrapperStyle}>
      <GestureDetector gesture={panGesture}>
        <InnerContainer style={[animatedStyle]}>
          {renderCard({ index, animationPosition, currentIndex })}
        </InnerContainer>
      </GestureDetector>
    </OuterContainer>
  )
})

const OuterContainer = styled.View({
  height: '100%',
  width: '100%',
  position: 'absolute',
})

const InnerContainer = styled(Animated.View)({
  flex: 1,
})
