import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { type SwipeableCardStackOptions } from '..'

export const useDefaultOptions = (): SwipeableCardStackOptions => {
  const { width, height } = useSafeAreaFrame()
  return {
    numberOfRenderedCards: 3,
    endedSwipePosition: {
      x: 1.5 * width,
      y: 1 * height,
    },
    validateSwipeTranslationThreshold: {
      x: 0.5 * width,
      y: 0.25 * height,
    },
    validateSwipeVelocityThreshold: 800,
    validatedSwipeAnimationConfig: {
      x: ({ velocityX }) => ({
        velocity: 0.0001 * velocityX,
        mass: 1,
        damping: 100,
        stiffness: 200,
      }),
      y: ({ velocityY }) => ({
        velocity: 0.0001 * velocityY,
        mass: 1,
        damping: 100,
        stiffness: 200,
      }),
    },
    imperativeSwipeAnimationConfig: undefined,
    stoppedSwipeAnimationConfig: undefined,
    unswipeAnimationConfig: undefined,
    lockedDirections: [],
  }
}
