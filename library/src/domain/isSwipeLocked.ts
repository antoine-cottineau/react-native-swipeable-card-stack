import { type SwipeAxis } from './SwipeAxis'
import { type SwipeDirection } from './SwipeDirection'

type Params = {
  translation: number
  axis: SwipeAxis
  lockedDirections: SwipeDirection[]
}

export const isSwipeLocked = ({
  translation,
  axis,
  lockedDirections,
}: Params): boolean => {
  const isXSwipeLocked =
    (lockedDirections.includes('left') && translation < 0) ||
    (lockedDirections.includes('right') && translation > 0)
  const isYSwipeLocked =
    (lockedDirections.includes('top') && translation < 0) ||
    (lockedDirections.includes('bottom') && translation > 0)

  return (axis === 'x' && isXSwipeLocked) || (axis === 'y' && isYSwipeLocked)
}
