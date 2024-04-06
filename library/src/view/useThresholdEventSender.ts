import {
  type SharedValue,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated'
import { type SwipeDirection } from '../domain/SwipeDirection'
import { type SwipeStatus } from '../domain/SwipeUpdate'

type Params = {
  isActive: boolean
  xAnimationPosition: SharedValue<number>
  yAnimationPosition: SharedValue<number>
  xAnimationThreshold: number
  yAnimationThreshold: number
  onCardSwipeStatusUpdated: (swipeStatus: SwipeStatus) => void
}

export const useThresholdEventSender = ({
  isActive,
  xAnimationPosition,
  yAnimationPosition,
  xAnimationThreshold,
  yAnimationThreshold,
  onCardSwipeStatusUpdated,
}: Params) => {
  useAnimatedReaction(
    () => isActive && Math.abs(xAnimationPosition.value) > xAnimationThreshold,
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

  useAnimatedReaction(
    () => isActive && Math.abs(yAnimationPosition.value) > yAnimationThreshold,
    (newValue, previousValue) => {
      if (previousValue === null || newValue === previousValue) {
        return
      }

      const direction: SwipeDirection =
        yAnimationPosition.value > 0 ? 'bottom' : 'top'
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
}
