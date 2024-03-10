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

  /**
   * The position where the cards rest at the end of a swipe.
   *
   * For example, if you set *endedSwipePosition* to 400, a card swipped to the left will end its movement at -400 while a card swipped to the right will end its movement at +400.
   *
   * Before any swipe, the cards sit idle at the position 0.
   *
   * Default value: 1.5 * screenWidth
   */
  endedSwipePosition: number

  validateSwipeAnimationPositionThreshold: number
  validateSwipeVelocityThreshold: number
}
