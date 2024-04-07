import { type SwipeAxis } from './SwipeAxis'

export type SwipeDirection = 'left' | 'right' | 'top' | 'bottom'

export const swipeDirectionAxisMapping: Record<SwipeDirection, SwipeAxis> = {
  left: 'x',
  right: 'x',
  top: 'y',
  bottom: 'y',
}
