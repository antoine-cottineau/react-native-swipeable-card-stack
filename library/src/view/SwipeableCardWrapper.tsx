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
  const horizontalAnimationPosition = useSharedValue(
    getSwipeSharedValueInitialValue(initialSwipeDirection, 'horizontal'),
  )
  const verticalAnimationPosition = useSharedValue(
    getSwipeSharedValueInitialValue(initialSwipeDirection, 'vertical'),
  )

  const horizontalEndedSwipePosition = extractSwipeAxisDependentPropValue(
    options.endedSwipePosition,
    'horizontal',
  )
  const verticalEndedSwipePosition = extractSwipeAxisDependentPropValue(
    options.endedSwipePosition,
    'vertical',
  )

  const isActive = index === currentIndex

  useImperativeHandle(ref, () => ({
    swipe: (direction) => {
      if (swipeDirectionAxisMapping[direction] === 'horizontal') {
        horizontalAnimationPosition.value = withTiming(
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
      }
    },
    unswipe: () => {
      horizontalAnimationPosition.value = withTiming(
        0,
        options.unswipeAnimationConfig,
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
      horizontalAnimationPosition.value =
        translationX / horizontalEndedSwipePosition
      verticalAnimationPosition.value =
        translationY / verticalEndedSwipePosition
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
        horizontalAnimationPosition.value = withSpring(
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

      horizontalAnimationPosition.value = withTiming(
        0,
        options.stoppedSwipeAnimationConfig,
        () => {
          runOnJS(onCardSwipeStatusUpdated)({ direction, phase: 'stopped' })
        },
      )
      verticalAnimationPosition.value = withTiming(
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
        translateX:
          horizontalAnimationPosition.value * horizontalEndedSwipePosition,
      },
      {
        translateY:
          verticalAnimationPosition.value * verticalEndedSwipePosition,
      },
    ],
  }))

  useAnimatedReaction(
    () =>
      isActive &&
      Math.abs(horizontalAnimationPosition.value) >
        options.validateSwipeTranslationThreshold,
    (newValue, previousValue) => {
      if (previousValue === null || newValue === previousValue) {
        return
      }

      const direction: SwipeDirection =
        horizontalAnimationPosition.value > 0 ? 'right' : 'left'
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
          horizontalAnimationPosition,
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
