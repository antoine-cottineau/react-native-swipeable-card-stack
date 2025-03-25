import {
  withSpring,
  type WithTimingConfig,
  type WithSpringConfig,
  type AnimationCallback,
  withTiming,
} from 'react-native-reanimated';

export type FallbackConfig =
  | ({ type: 'timing' } & WithTimingConfig)
  | ({ type: 'spring' } & WithSpringConfig);

type Params = {
  userTimingConfig?: WithTimingConfig;
  userSpringConfig?: WithSpringConfig;
  fallbackConfig: FallbackConfig;
  callback?: AnimationCallback;
};

export const withAnimation = ({
  userTimingConfig,
  userSpringConfig,
  fallbackConfig,
  callback,
}: Params): ((toValue: number) => number) => {
  'worklet';
  if (userTimingConfig !== undefined) {
    return (toValue) => withTiming(toValue, userTimingConfig, callback);
  }
  if (userSpringConfig !== undefined) {
    return (toValue) => withSpring(toValue, userSpringConfig, callback);
  }
  if (fallbackConfig.type === 'timing') {
    return (toValue) => withTiming(toValue, fallbackConfig, callback);
  }
  return (toValue) => withSpring(toValue, fallbackConfig, callback);
};
