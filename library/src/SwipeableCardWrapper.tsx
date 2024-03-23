import styled from '@emotion/native'
import { type ReactNode } from 'react'
import { type StyleProp, type ViewStyle } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
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

export const SwipeableCardWrapper = ({
  renderCard,
  animationPosition,
  cardWrapperStyle,
  onCardSwipeStatusUpdated,
  index,
  currentIndex,
  options,
}: SwipeableCardWrapperProps) => {
  const isActive = index === currentIndex

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
        translateX: isActive
          ? animationPosition.value * options.endedSwipePosition
          : 0,
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
    <OuterContainer style={cardWrapperStyle}>
      <GestureDetector gesture={panGesture}>
        <InnerContainer style={[animatedStyle]}>
          {renderCard({ index, animationPosition, currentIndex })}
        </InnerContainer>
      </GestureDetector>
    </OuterContainer>
  )
}

const OuterContainer = styled.View({
  height: '100%',
  width: '100%',
  position: 'absolute',
})

const InnerContainer = styled(Animated.View)({
  flex: 1,
})
