import { type SwipeDirection } from '..'

export const swipeDirectionAnimationPositionMapping: Record<
  SwipeDirection,
  number
> = {
  left: -1,
  right: 1,
  bottom: -1,
  top: 1,
}
