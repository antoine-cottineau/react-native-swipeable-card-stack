import { Dimensions } from 'react-native'
import { Easing } from 'react-native-reanimated'
import { type SwipeableCardStackOptions } from '..'

export const useDefaultOptions = (): SwipeableCardStackOptions => {
  const { width, height } = Dimensions.get('window')
  return {
    initialIndex: 0,
    numberOfRenderedCards: 3,
    endedSwipePosition: {
      x: 1.5 * width,
      y: 1 * height,
    },
    validateSwipeTranslationThreshold: {
      x: 0.4 * width,
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
    imperativeSwipeAnimationConfig: {
      duration: 300,
      easing: Easing.inOut(Easing.quad),
    },
    stoppedSwipeAnimationConfig: {
      duration: 300,
      easing: Easing.inOut(Easing.quad),
    },
    unswipeAnimationConfig: {
      duration: 300,
      easing: Easing.inOut(Easing.quad),
    },
    lockedDirections: [],
  }
}
