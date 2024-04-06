import { type SwipeAxis } from './SwipeAxis'

export type SwipeDirection = 'left' | 'right' | 'top' | 'bottom'

export const swipeDirectionAxisMapping: Record<SwipeDirection, SwipeAxis> = {
  left: 'horizontal',
  right: 'horizontal',
  top: 'vertical',
  bottom: 'vertical',
}
