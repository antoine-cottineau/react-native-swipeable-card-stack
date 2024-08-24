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

  /**
   * Check if the last swipe can be undone.
   * This is true if and only if a card in the stack has been swiped before.
   */
  canUnswipe: () => boolean
}
