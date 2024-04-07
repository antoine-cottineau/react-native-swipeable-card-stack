import { type PanGestureHandlerEventPayload } from 'react-native-gesture-handler'
import {
  type WithTimingConfig,
  type WithSpringConfig,
} from 'react-native-reanimated'
import { type SwipeAxisDependentProp } from '../domain/SwipeAxisDependentProp'

export type SwipeableCardStackOptions = {
  /**
   * How many cards should be rendered at the same time.
   *
   * To improve performance, *react-native-swipeable-card-stack* does not render all the cards.
   * This has usually no visual impact from a user standpoint because most of the cards are hidden by the two first cards of the stack.
   * However, if you encounter a case where some cards are not visible, you may want to increase this value.
   *
   * Default value: `3`
   */
  numberOfRenderedCards: number

  /**
   * The position where the cards rest at the end of a swipe.
   *
   * This prop accepts either a number or an object whose keys are swipe axis ("x" and "y") and whose values are numbers.
   *
   * For example, if you set `endedSwipePosition` to 400, a card swipped respectively to the left or to the bottom will end its movement at respectively +400 to the left or +400 to the bottom. A card swipped respectively to the right or to the top will end its movement at respectively +400 to the right or +400 to the top.
   *
   * Before any swipe, the cards sit idle at the position 0.
   *
   * Default value: `{ x: 1.5 * screenWidth, y: 1 * screenHeight }`
   */
  endedSwipePosition: SwipeAxisDependentProp<number>

  /**
   * The translation needed for a swipe to be considered as validated, which means that if the user releases the card, the swipe animation will finish and the swipe will be completed.
   *
   * This prop accepts either a number or an object whose keys are swipe axis ("x" and "y") and whose values are numbers.
   *
   * For example, if you set `validatedSwipeTranslationThreshold` to 200 and the user swipes 190 to the right and releases the card, the swipe will be aborted. Hovewer, if the user swipes 210 to the right, the swipe will complete.
   *
   * A swipe can also be validated if the velocity is high enough, see `validateSwipeVelocityThreshold`.
   *
   * Default value: `{ x: 0.5 * screenWidth, y: 0.25 * screenHeight }`
   */
  validateSwipeTranslationThreshold: SwipeAxisDependentProp<number>

  /**
   * The velocity needed for a swipe to be validated.
   *
   * This prop accepts either a number or an object whose keys are swipe axis ("x" and "y") and whose values are numbers.
   *
   * A swipe can also be validated if the translation is high enough, see `validateSwipeTranslationThreshold`.
   *
   * Default value: `800`
   */
  validateSwipeVelocityThreshold: SwipeAxisDependentProp<number>

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

  /**
   * A reanimated [TimingConfig](https://docs.swmansion.com/react-native-reanimated/docs/animations/withTiming) that is used when the card is imperatively swipped via `ref.swipeLeft` or `ref.swipeRight`.
   *
   * Default value: `undefined`
   */
  imperativeSwipeAnimationConfig?: WithTimingConfig

  /**
   * A reanimated [TimingConfig](https://docs.swmansion.com/react-native-reanimated/docs/animations/withTiming) that is used when the swipe is stopped without being validated and the card position gets reset.
   *
   * Default value: `undefined`
   */
  stoppedSwipeAnimationConfig?: WithTimingConfig

  /**
   * A reanimated [TimingConfig](https://docs.swmansion.com/react-native-reanimated/docs/animations/withTiming) that is used when an unswipe is performed.
   *
   * Default value: `undefined`
   */
  unswipeAnimationConfig?: WithTimingConfig
}
