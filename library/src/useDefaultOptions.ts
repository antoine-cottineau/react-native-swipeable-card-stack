import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { type SwipeableCardStackOptions } from '.'

export const useDefaultOptions = (): SwipeableCardStackOptions => {
  const { width } = useSafeAreaFrame()
  return {
    numberOfRenderedCards: 3,
    endedSwipePosition: 1.5 * width,
    validateSwipeTranslationThreshold: 0.5 * width,
    validateSwipeVelocityThreshold: 800,
    validatedSwipeAnimationConfig: ({ velocityX }) => ({
      velocity: 0.0001 * velocityX,
      mass: 1,
      damping: 100,
      stiffness: 200,
    }),
  }
}
