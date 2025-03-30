import type { ReactNode } from 'react';
import type {
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {
  type SharedValue,
  type WithSpringConfig,
  type WithTimingConfig,
} from 'react-native-reanimated';

export type SwipeDirection = 'unknown' | 'left' | 'right' | 'bottom' | 'top';

export type AllowedPanDirection = Exclude<SwipeDirection, 'unknown'>;

export type AllowedSwipeDirection = Exclude<SwipeDirection, 'unknown'>;

export type RenderCard<T> = (cardProps: CardProps<T>) => ReactNode;

export type CardProps<T> = T & {
  /**
   * The animated x-coordinate position of the card.
   * Represents the horizontal position relative to the initial position.
   * Positive values move the card right, negative values move it left.
   */
  xAnimatedPosition: SharedValue<number>;
  /**
   * The animated y-coordinate position of the card.
   * Represents the vertical position relative to the initial position.
   * Positive values move the card down, negative values move it up.
   */
  yAnimatedPosition: SharedValue<number>;
};

export type AnimationConfigs = {
  /**
   * Configuration for timing animation when swipe direction is unknown.
   * @default { type: 'timing', duration: 300, easing: Easing.inOut(Easing.quad), reduceMotion: ReduceMotion.System }
   */
  unknownSwipeTimingConfig?: WithTimingConfig;
  /**
   * Configuration for timing animation when card is swiped left.
   * @default { type: 'timing', duration: 300, easing: Easing.inOut(Easing.quad), reduceMotion: ReduceMotion.System }
   */
  leftSwipeTimingConfig?: WithTimingConfig;
  /**
   * Configuration for timing animation when card is swiped right.
   * @default { type: 'timing', duration: 300, easing: Easing.inOut(Easing.quad), reduceMotion: ReduceMotion.System }
   */
  rightSwipeTimingConfig?: WithTimingConfig;
  /**
   * Configuration for timing animation when card is swiped bottom.
   * @default { type: 'timing', duration: 300, easing: Easing.inOut(Easing.quad), reduceMotion: ReduceMotion.System }
   */
  bottomSwipeTimingConfig?: WithTimingConfig;
  /**
   * Configuration for timing animation when card is swiped top.
   * @default { type: 'timing', duration: 300, easing: Easing.inOut(Easing.quad), reduceMotion: ReduceMotion.System }
   */
  topSwipeTimingConfig?: WithTimingConfig;
  /**
   * Configuration for timing animation when card returns to initial position.
   * @default { type: 'timing', duration: 300, easing: Easing.inOut(Easing.quad), reduceMotion: ReduceMotion.System }
   */
  resetSwipeTimingConfig?: WithTimingConfig;

  /**
   * Configuration for spring animation when swipe direction is unknown.
   * @default undefined - timing animation is used by default
   */
  unknownSwipeSpringConfig?: WithSpringConfig;
  /**
   * Configuration for spring animation when card is swiped left.
   * @default undefined - timing animation is used by default
   */
  leftSwipeSpringConfig?: WithSpringConfig;
  /**
   * Configuration for spring animation when card is swiped right.
   * @default undefined - timing animation is used by default
   */
  rightSwipeSpringConfig?: WithSpringConfig;
  /**
   * Configuration for spring animation when card is swiped bottom.
   * @default undefined - timing animation is used by default
   */
  bottomSwipeSpringConfig?: WithSpringConfig;
  /**
   * Configuration for spring animation when card is swiped top.
   * @default undefined - timing animation is used by default
   */
  topSwipeSpringConfig?: WithSpringConfig;
  /**
   * Configuration for spring animation when card returns to initial position.
   * @default undefined - timing animation is used by default
   */
  resetSwipeSpringConfig?: WithSpringConfig;

  /**
   * Configuration for timing animation when validating left swipe.
   * Called when gesture ends and either translation or velocity threshold is met for left direction.
   * @default undefined - spring animation is used by default
   */
  validationLeftSwipeTimingConfig?: (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => WithTimingConfig;
  /**
   * Configuration for timing animation when validating right swipe.
   * Called when gesture ends and swipe threshold is met for right direction.
   * @default undefined - spring animation is used by default
   */
  validationRightSwipeTimingConfig?: (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => WithTimingConfig;
  /**
   * Configuration for timing animation when validating bottom swipe.
   * Called when gesture ends and swipe threshold is met for bottom direction.
   * @default undefined - spring animation is used by default
   */
  validationBottomSwipeTimingConfig?: (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => WithTimingConfig;
  /**
   * Configuration for timing animation when validating top swipe.
   * Called when gesture ends and swipe threshold is met for top direction.
   * @default undefined - spring animation is used by default
   */
  validationTopSwipeTimingConfig?: (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => WithTimingConfig;

  /**
   * Configuration for spring animation when validating left swipe.
   * Called when gesture ends and either translation or velocity threshold is met for left direction.
   * @default (event) => ({ type: 'spring', duration: 300, easing: Easing.inOut(Easing.quad), reduceMotion: ReduceMotion.System, velocity: event.velocityX / windowWidth })
   */
  validationLeftSwipeSpringConfig?: (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => WithSpringConfig;
  /**
   * Configuration for spring animation when validating right swipe.
   * Called when gesture ends and swipe threshold is met for right direction.
   * @default (event) => ({ type: 'spring', duration: 300, easing: Easing.inOut(Easing.quad), reduceMotion: ReduceMotion.System, velocity: event.velocityX / windowWidth })
   */
  validationRightSwipeSpringConfig?: (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => WithSpringConfig;
  /**
   * Configuration for spring animation when validating bottom swipe.
   * Called when gesture ends and swipe threshold is met for bottom direction.
   * @default (event) => ({ type: 'spring', duration: 300, easing: Easing.inOut(Easing.quad), reduceMotion: ReduceMotion.System, velocity: event.velocityY / windowHeight })
   */
  validationBottomSwipeSpringConfig?: (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => WithSpringConfig;
  /**
   * Configuration for spring animation when validating top swipe.
   * Called when gesture ends and swipe threshold is met for top direction.
   * @default (event) => ({ type: 'spring', duration: 300, easing: Easing.inOut(Easing.quad), reduceMotion: ReduceMotion.System, velocity: event.velocityY / windowHeight })
   */
  validationTopSwipeSpringConfig?: (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => WithSpringConfig;

  /**
   * Configuration for timing animation when horizontal swipe is canceled.
   * Called when gesture ends and neither translation nor velocity threshold is met for horizontal direction.
   * @default () => ({ type: 'timing', duration: 300, easing: Easing.inOut(Easing.quad), reduceMotion: ReduceMotion.System })
   */
  canceledHorizontalSwipeTimingConfig?: (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => WithTimingConfig;
  /**
   * Configuration for timing animation when vertical swipe is canceled.
   * Called when gesture ends and neither translation nor velocity threshold is met for vertical direction.
   * @default () => ({ type: 'timing', duration: 300, easing: Easing.inOut(Easing.quad), reduceMotion: ReduceMotion.System })
   */
  canceledVerticalSwipeTimingConfig?: (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => WithTimingConfig;

  /**
   * Configuration for spring animation when horizontal swipe is canceled.
   * Called when gesture ends and neither translation nor velocity threshold is met for horizontal direction.
   * @default undefined - timing animation is used by default
   */
  canceledHorizontalSwipeSpringConfig?: (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => WithSpringConfig;
  /**
   * Configuration for spring animation when vertical swipe is canceled.
   * Called when gesture ends and neither translation nor velocity threshold is met for vertical direction.
   * @default undefined - timing animation is used by default
   */
  canceledVerticalSwipeSpringConfig?: (
    event: GestureStateChangeEvent<PanGestureHandlerEventPayload>
  ) => WithSpringConfig;
};
