import { type PanGestureHandlerEventPayload } from 'react-native-gesture-handler'
import { type WithSpringConfig } from 'react-native-reanimated'

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

  /**
   * The translation needed for a swipe to be considered as validated, which means that if the user releases the card, the swipe animation will finish and the swipe will be completed.
   *
   * For example, if you set *validatedSwipeTranslationThreshold* to 200 and the user swipes 190 to the right and releases the card, the swipe will be aborted. Hovewer, if the user swipes 210 to the right, the swipe will complete.
   *
   * Note that the same behaviour is valid on the left side (negative positions).
   *
   * A swipe can also be validated if the velocity is high enough, see *validateSwipeVelocityThreshold*.
   *
   * Default value: 0.5 * screenWidth
   */
  validateSwipeTranslationThreshold: number

  /**
   * The velocity needed for a swipe to be validated.
   *
   * A swipe can also be validated if the translation is high enough, see *validateSwipeTranslationThreshold*.
   *
   * Default value: 800
   */
  validateSwipeVelocityThreshold: number

  /**
   * A function that returns a reanimated [SpringConfig](https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring/) that will be used in the final animation once a swipe is validated.
   *
   * @param payload A gesture-handler payload that you can use to customize the config.
   *
   * Default value: see *useDefaultOptions.ts*.
   */
  validatedSwipeAnimationConfig: (
    payload: PanGestureHandlerEventPayload,
  ) => WithSpringConfig
}
