import { type SwipeDirection } from './SwipeDirection'
import { type SwipePhase } from './SwipePhase'

export type SwipeUpdate<T> = SwipeStatus & {
  currentIndex: number
  currentDataItem: T
}

export type SwipeStatus = {
  direction: SwipeDirection
  phase: SwipePhase
}
