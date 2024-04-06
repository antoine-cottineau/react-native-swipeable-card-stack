import { type SwipeDirection } from './SwipeDirection'

export type SwipeableCardRef = {
  swipe: (direction: SwipeDirection) => void
  unswipe: () => void
}
