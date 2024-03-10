import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { type SwipeableCardStackOptions } from '.'

export const useDefaultOptions = (): SwipeableCardStackOptions => {
  const { width } = useSafeAreaFrame()
  return {
    numberOfRenderedCards: 3,
    validateSwipeAnimationPositionThreshold: 0.4,
    validateSwipeVelocityThreshold: 800,
    endedSwipePosition: 1.5 * width,
  }
}
