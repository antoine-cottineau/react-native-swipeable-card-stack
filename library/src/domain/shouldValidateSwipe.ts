type Params = {
  translation: number
  velocity: number
  validateSwipeTranslationThreshold: number
  validateSwipeVelocityThreshold: number
}

export const shouldValidateSwipe = ({
  translation,
  velocity,
  validateSwipeTranslationThreshold,
  validateSwipeVelocityThreshold,
}: Params) => {
  'worklet'
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
    Math.abs(translation) > validateSwipeTranslationThreshold ||
    Math.abs(velocity) > validateSwipeVelocityThreshold
  )
}
