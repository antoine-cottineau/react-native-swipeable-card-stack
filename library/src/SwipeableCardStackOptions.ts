export type SwipeableCardStackOptions = {
  numberOfRenderedCards: number;
  validateSwipeAnimationPositionThreshold: number;
  validateSwipeVelocityThreshold: number;
  endedSwipeAnimationPosition: number;
};

export const swipeableCardStackDefaultOptions: SwipeableCardStackOptions = {
  numberOfRenderedCards: 3,
  validateSwipeAnimationPositionThreshold: 0.4,
  validateSwipeVelocityThreshold: 800,
  endedSwipeAnimationPosition: 1.5,
};
