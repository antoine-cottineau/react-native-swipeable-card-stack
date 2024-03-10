export type SwipeableCardStackOptions = {
  /**
   * How many cards should be rendered at the same time.
   *
   * To improve performance, *react-native-swipeable-card-stack* does not render all the cards.
   * This has usually no visual impact from a user standpoint because most of the cards are hidden by the two first cards of the stack.
   * However, if you encounter a case where some cards are not visible, you may want to increase this value.
   *
   * Default value: 3
   */
  numberOfRenderedCards: number
  validateSwipeAnimationPositionThreshold: number
  validateSwipeVelocityThreshold: number
  endedSwipeAnimationPosition: number
}

export const swipeableCardStackDefaultOptions: SwipeableCardStackOptions = {
  numberOfRenderedCards: 3,
  validateSwipeAnimationPositionThreshold: 0.4,
  validateSwipeVelocityThreshold: 800,
  endedSwipeAnimationPosition: 1.5,
}
