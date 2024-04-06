import { type SwipeDirection } from './SwipeDirection'

export type SwipeableCardRef = {
  /**
   * Imperatively swipe the current card to the provided direction.
   * @param direction Either 'left', 'right', 'top' or 'bottom'
   */
  swipe: (direction: SwipeDirection) => void

  /**
   * Imperatively undo the last swipe.
   */
  unswipe: () => void
}
