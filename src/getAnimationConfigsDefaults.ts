import type {
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import type { AllowedSwipeDirection, SwipeDirection } from './types';
import type { FallbackConfig } from './withAnimation';
import { Easing, ReduceMotion } from 'react-native-reanimated';

type Params = {
  windowWidth: number;
  windowHeight: number;
};

type SwipeDirectionAnimationConfigRecord = Record<
  `${SwipeDirection | 'reset'}Swipe`,
  FallbackConfig
>;

type ValidationAnimationConfigRecord = Record<
  `validation${Capitalize<AllowedSwipeDirection>}Swipe`,
  (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => FallbackConfig
>;

type CancelationAnimationConfigRecord = Record<
  `canceled${'Horizontal' | 'Vertical'}Swipe`,
  (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => FallbackConfig
>;

export type AnimationConfigsDefaults = SwipeDirectionAnimationConfigRecord &
  ValidationAnimationConfigRecord &
  CancelationAnimationConfigRecord;

export const getAnimationConfigsDefaults = ({
  windowWidth,
  windowHeight,
}: Params): AnimationConfigsDefaults => ({
  unknownSwipe: {
    type: 'timing',
    duration: 300,
    easing: Easing.inOut(Easing.quad),
    reduceMotion: ReduceMotion.System,
  },
  leftSwipe: {
    type: 'timing',
    duration: 300,
    easing: Easing.inOut(Easing.quad),
    reduceMotion: ReduceMotion.System,
  },
  rightSwipe: {
    type: 'timing',
    duration: 300,
    easing: Easing.inOut(Easing.quad),
    reduceMotion: ReduceMotion.System,
  },
  bottomSwipe: {
    type: 'timing',
    duration: 300,
    easing: Easing.inOut(Easing.quad),
    reduceMotion: ReduceMotion.System,
  },
  topSwipe: {
    type: 'timing',
    duration: 300,
    easing: Easing.inOut(Easing.quad),
    reduceMotion: ReduceMotion.System,
  },
  resetSwipe: {
    type: 'timing',
    duration: 300,
    easing: Easing.inOut(Easing.quad),
    reduceMotion: ReduceMotion.System,
  },
  validationLeftSwipe: (event) => {
    'worklet';
    return {
      type: 'spring',
      duration: 300,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
      velocity: event.velocityX / windowWidth,
    };
  },
  validationRightSwipe: (event) => {
    'worklet';
    return {
      type: 'spring',
      duration: 300,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
      velocity: event.velocityX / windowWidth,
    };
  },
  validationBottomSwipe: (event) => {
    'worklet';
    return {
      type: 'spring',
      duration: 300,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
      velocity: event.velocityY / windowHeight,
    };
  },
  validationTopSwipe: (event) => {
    'worklet';
    return {
      type: 'spring',
      duration: 300,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
      velocity: event.velocityY / windowHeight,
    };
  },
  canceledHorizontalSwipe: () => {
    'worklet';
    return {
      type: 'timing',
      duration: 300,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    };
  },
  canceledVerticalSwipe: () => {
    'worklet';
    return {
      type: 'timing',
      duration: 300,
      easing: Easing.inOut(Easing.quad),
      reduceMotion: ReduceMotion.System,
    };
  },
});
