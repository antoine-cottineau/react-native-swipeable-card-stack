export type SwipeDirection = 'left' | 'right' | 'top' | 'bottom'

export const isHorizontal = (direction: SwipeDirection) =>
  direction === 'left' || direction === 'right'

export const isVertical = (direction: SwipeDirection) =>
  direction === 'top' || direction === 'bottom'
