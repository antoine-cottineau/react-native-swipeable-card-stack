type Params = {
  animationPosition: number;
  velocity: number;
  validateSwipeAnimationPositionThreshold: number;
  validateSwipeVelocityThreshold: number;
};

export const shouldValidateSwipe = ({
  animationPosition,
  velocity,
  validateSwipeAnimationPositionThreshold,
  validateSwipeVelocityThreshold,
}: Params) => {
  'worklet';
  // We must check that, even if the velocity is high enough
  // for validating the swipe, it is in the same direction
  // as the translation.
  // Otherwise, we could swipe to the far left and then do a subtle
  // but quick swipe to the right and have the swipe validated, even
  // if it makes no sense to the user.
  const isVelocityInCorrectDirection =
    Math.sign(velocity) === Math.sign(animationPosition);
  if (!isVelocityInCorrectDirection) {
    return false;
  }

  return (
    Math.abs(animationPosition) > validateSwipeAnimationPositionThreshold ||
    Math.abs(velocity) > validateSwipeVelocityThreshold
  );
};
