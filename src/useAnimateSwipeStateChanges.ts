import { useEffect } from 'react';
import { withAnimation } from './withAnimation';
import type { AnimationConfigs, SwipeDirection } from './types';
import type { AnimationConfigsDefaults } from './getAnimationConfigsDefaults';
import type { SharedValue } from 'react-native-reanimated';

type Params = {
  cardState: SwipeDirection | undefined;
  xAnimatedPosition: SharedValue<number>;
  yAnimatedPosition: SharedValue<number>;
  animatedOpacity: SharedValue<number>;
  animationConfigs: AnimationConfigs;
  animationConfigsDefaults: AnimationConfigsDefaults;
};

export const useAnimateSwipeStateChanges = ({
  cardState,
  xAnimatedPosition,
  yAnimatedPosition,
  animatedOpacity,
  animationConfigs,
  animationConfigsDefaults,
}: Params) => {
  useEffect(() => {
    if (cardState === 'unknown') {
      const animate = withAnimation({
        userTimingConfig: animationConfigs.unknownSwipeTimingConfig,
        userSpringConfig: animationConfigs.unknownSwipeSpringConfig,
        fallbackConfig: animationConfigsDefaults.unknownSwipe,
      });
      xAnimatedPosition.value = animate(0);
      yAnimatedPosition.value = animate(0);
      animatedOpacity.value = animate(0);
      return;
    }
    if (cardState === 'left') {
      const animate = withAnimation({
        userTimingConfig: animationConfigs.leftSwipeTimingConfig,
        userSpringConfig: animationConfigs.leftSwipeSpringConfig,
        fallbackConfig: animationConfigsDefaults.leftSwipe,
      });
      xAnimatedPosition.value = animate(-1);
      yAnimatedPosition.value = animate(0);
      animatedOpacity.value = animate(1);
      return;
    }
    if (cardState === 'right') {
      const animate = withAnimation({
        userTimingConfig: animationConfigs.rightSwipeTimingConfig,
        userSpringConfig: animationConfigs.rightSwipeSpringConfig,
        fallbackConfig: animationConfigsDefaults.rightSwipe,
      });
      xAnimatedPosition.value = animate(1);
      yAnimatedPosition.value = animate(0);
      animatedOpacity.value = animate(1);
      return;
    }
    if (cardState === 'bottom') {
      const animate = withAnimation({
        userTimingConfig: animationConfigs.bottomSwipeTimingConfig,
        userSpringConfig: animationConfigs.bottomSwipeSpringConfig,
        fallbackConfig: animationConfigsDefaults.bottomSwipe,
      });
      xAnimatedPosition.value = animate(0);
      yAnimatedPosition.value = animate(1);
      animatedOpacity.value = animate(1);
      return;
    }
    if (cardState === 'top') {
      const animate = withAnimation({
        userTimingConfig: animationConfigs.topSwipeTimingConfig,
        userSpringConfig: animationConfigs.topSwipeSpringConfig,
        fallbackConfig: animationConfigsDefaults.topSwipe,
      });
      xAnimatedPosition.value = animate(0);
      yAnimatedPosition.value = animate(-1);
      animatedOpacity.value = animate(1);
      return;
    }
    if (cardState === undefined) {
      const animate = withAnimation({
        userTimingConfig: animationConfigs.resetSwipeTimingConfig,
        userSpringConfig: animationConfigs.resetSwipeSpringConfig,
        fallbackConfig: animationConfigsDefaults.resetSwipe,
      });
      xAnimatedPosition.value = animate(0);
      yAnimatedPosition.value = animate(0);
      animatedOpacity.value = animate(1);
      return;
    }
  }, [
    cardState,
    xAnimatedPosition,
    yAnimatedPosition,
    animatedOpacity,
    animationConfigs,
    animationConfigsDefaults,
  ]);
};
