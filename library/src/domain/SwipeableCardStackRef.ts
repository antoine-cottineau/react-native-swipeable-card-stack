import { type SwipeDirection } from './SwipeDirection'

export type SwipeableCardStackRef = {
  /**
   * Imperatively swipe the current card to the provided direction.
   * The direction can either be 'left', 'right', 'top' or 'bottom'.
   */
  swipe: (direction: SwipeDirection) => void

  /**
   * Imperatively undo the last swipe.
   */
  unswipe: () => void
}
