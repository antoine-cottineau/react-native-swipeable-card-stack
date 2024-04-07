/**
 * A phase in which the swipe can be.
 *
 * - *started*: a swipe gesture has started
 * - *stopped*: the user just released the card, the card position will reset
 * - *below-threshold*: the card just went below the validation threshold
 * - *above-threshold*: the card just went above the validation threshold
 * - *validated*: the swipe is now validated, for example if the user just released the card after it went above the validation threshold
 * - *ended*: the card just ended its animation after being validated
 */
export type SwipePhase =
  | 'started'
  | 'stopped'
  | 'below-threshold'
  | 'above-threshold'
  | 'validated'
  | 'ended'
