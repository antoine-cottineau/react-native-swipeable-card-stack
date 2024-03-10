import { type SwipeableCardStackOptions } from '.'

export const useDefaultOptions = (): SwipeableCardStackOptions => ({
  numberOfRenderedCards: 3,
  validateSwipeAnimationPositionThreshold: 0.4,
  validateSwipeVelocityThreshold: 800,
  endedSwipeAnimationPosition: 1.5,
})
