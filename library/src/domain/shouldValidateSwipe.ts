import { type SwipeAxis } from './SwipeAxis'
import { type SwipeDirection } from './SwipeDirection'
import { isSwipeLocked } from './isSwipeLocked'

type Params = {
  translation: number
  velocity: number
  translationThreshold: number
  velocityThreshold: number
  axis: SwipeAxis
  lockedDirections: SwipeDirection[]
}

export const shouldValidateSwipe = ({
  translation,
  velocity,
  translationThreshold,
  velocityThreshold,
  axis,
  lockedDirections,
}: Params) => {
  'worklet'
  if (isSwipeLocked({ translation, axis, lockedDirections })) {
    return false
  }

  // We must check that, even if the velocity is high enough
  // for validating the swipe, it is in the same direction
  // as the translation.
  // Otherwise, we could swipe to the far left and then do a subtle
  // but quick swipe to the right and have the swipe validated, even
  // if it makes no sense to the user.
  const isVelocityInCorrectDirection =
    Math.sign(velocity) === Math.sign(translation)
  if (!isVelocityInCorrectDirection) {
    return false
  }

  return (
    Math.abs(translation) > translationThreshold ||
    Math.abs(velocity) > velocityThreshold
  )
}
