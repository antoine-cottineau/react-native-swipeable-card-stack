import { Dimensions, StyleSheet } from 'react-native';
import type {
  AllowedPanDirection,
  AnimationConfigs,
  CardProps,
  RenderCard,
  SwipeDirection,
} from './types';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { memo, useMemo, type ReactElement } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { getAnimationConfigsDefaults } from './getAnimationConfigsDefaults';
import { useAnimateSwipeStateChanges } from './useAnimateSwipeStateChanges';
import { withAnimation } from './withAnimation';

export type SwipeableCardContainerProps<T> = {
  item: T;
  renderCard: RenderCard<T>;
  cardState: SwipeDirection | undefined;
  horizontalTranslationValidationThreshold?: number;
  horizontalVelocityValidationThreshold: number;
  verticalTranslationValidationThreshold?: number;
  verticalVelocityValidationThreshold: number;
  allowedPanDirections: AllowedPanDirection[];
  allowedSwipeDirections: AllowedPanDirection[];
  onSwipeEnded?: (item: T, direction: SwipeDirection) => void;
  horizontalRestingPosition?: number;
  verticalRestingPosition?: number;
} & AnimationConfigs;

const UnmemoizedSwipeableCardContainer = <T,>({
  item,
  renderCard,
  cardState,
  horizontalTranslationValidationThreshold:
    userHorizontalTranslationValidationThreshold,
  horizontalVelocityValidationThreshold,
  verticalTranslationValidationThreshold:
    userVerticalTranslationValidationThreshold,
  verticalVelocityValidationThreshold,
  allowedPanDirections,
  allowedSwipeDirections,
  onSwipeEnded,
  horizontalRestingPosition: userHorizontalRestingPosition,
  verticalRestingPosition: userVerticalRestingPosition,
  ...animationConfigs
}: SwipeableCardContainerProps<T>) => {
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

  const xAnimatedPosition = useSharedValue(0);
  const yAnimatedPosition = useSharedValue(0);
  const animatedOpacity = useSharedValue(1);
  const animationConfigsDefaults = useMemo(
    () => getAnimationConfigsDefaults({ windowWidth, windowHeight }),
    [windowWidth, windowHeight]
  );

  const horizontalTranslationValidationThreshold =
    userHorizontalTranslationValidationThreshold ?? 0.3 * windowWidth;
  const verticalTranslationValidationThreshold =
    userVerticalTranslationValidationThreshold ?? 0.3 * windowHeight;

  const horizontalRestingPosition =
    userHorizontalRestingPosition ?? windowWidth;
  const verticalRestingPosition = userVerticalRestingPosition ?? windowHeight;

  useAnimateSwipeStateChanges({
    cardState,
    xAnimatedPosition,
    yAnimatedPosition,
    animatedOpacity,
    animationConfigs,
    animationConfigsDefaults,
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: xAnimatedPosition.value * horizontalRestingPosition },
      { translateY: yAnimatedPosition.value * verticalRestingPosition },
    ],
    opacity: animatedOpacity.value,
  }));

  const gesture = Gesture.Pan()
    .onUpdate(({ translationX, translationY }) => {
      if (
        (translationX >= 0 && allowedPanDirections.includes('right')) ||
        (translationX <= 0 && allowedPanDirections.includes('left'))
      ) {
        xAnimatedPosition.value = translationX / horizontalRestingPosition;
      }
      if (
        (translationY >= 0 && allowedPanDirections.includes('bottom')) ||
        (translationY <= 0 && allowedPanDirections.includes('top'))
      ) {
        yAnimatedPosition.value = translationY / verticalRestingPosition;
      }
    })
    .onEnd((event) => {
      if (
        Math.abs(event.translationX) >= Math.abs(event.translationY) &&
        (Math.abs(event.translationX) >=
          horizontalTranslationValidationThreshold ||
          Math.abs(event.velocityX) >= horizontalVelocityValidationThreshold)
      ) {
        const direction: SwipeDirection =
          event.translationX >= 0 ? 'right' : 'left';
        if (allowedSwipeDirections.includes(direction)) {
          const animate = withAnimation({
            userTimingConfig:
              direction === 'left'
                ? animationConfigs.validationLeftSwipeTimingConfig?.(event)
                : animationConfigs.validationRightSwipeTimingConfig?.(event),
            userSpringConfig:
              direction === 'left'
                ? animationConfigs.validationLeftSwipeSpringConfig?.(event)
                : animationConfigs.validationRightSwipeSpringConfig?.(event),
            fallbackConfig:
              direction === 'left'
                ? animationConfigsDefaults.validationLeftSwipe(event)
                : animationConfigsDefaults.validationRightSwipe(event),
            callback: () => {
              if (onSwipeEnded !== undefined) {
                runOnJS(onSwipeEnded)(item, direction);
              }
            },
          });
          xAnimatedPosition.value = animate(Math.sign(event.translationX));
          return;
        }
      }

      if (
        Math.abs(event.translationY) >= Math.abs(event.translationX) &&
        (Math.abs(event.translationY) >=
          verticalTranslationValidationThreshold ||
          Math.abs(event.velocityY) >= verticalVelocityValidationThreshold)
      ) {
        const direction: SwipeDirection =
          event.translationY >= 0 ? 'bottom' : 'top';
        if (allowedSwipeDirections.includes(direction)) {
          const animate = withAnimation({
            userTimingConfig:
              direction === 'bottom'
                ? animationConfigs.validationBottomSwipeTimingConfig?.(event)
                : animationConfigs.validationTopSwipeTimingConfig?.(event),
            userSpringConfig:
              direction === 'bottom'
                ? animationConfigs.validationBottomSwipeSpringConfig?.(event)
                : animationConfigs.validationTopSwipeSpringConfig?.(event),
            fallbackConfig:
              direction === 'bottom'
                ? animationConfigsDefaults.validationBottomSwipe(event)
                : animationConfigsDefaults.validationTopSwipe(event),
            callback: () => {
              if (onSwipeEnded !== undefined) {
                runOnJS(onSwipeEnded)(item, direction);
              }
            },
          });
          yAnimatedPosition.value = animate(Math.sign(event.translationY));
          return;
        }
      }

      xAnimatedPosition.value = withAnimation({
        userTimingConfig:
          animationConfigs.canceledHorizontalSwipeTimingConfig?.(event),
        userSpringConfig:
          animationConfigs.canceledHorizontalSwipeSpringConfig?.(event),
        fallbackConfig: animationConfigsDefaults.canceledHorizontalSwipe(event),
      })(0);
      yAnimatedPosition.value = withAnimation({
        userTimingConfig:
          animationConfigs.canceledVerticalSwipeTimingConfig?.(event),
        userSpringConfig:
          animationConfigs.canceledVerticalSwipeSpringConfig?.(event),
        fallbackConfig: animationConfigsDefaults.canceledVerticalSwipe(event),
      })(0);
    })
    .enabled(cardState === undefined);

  const cardProps = useMemo<CardProps<T>>(
    () => ({
      ...item,
      xAnimatedPosition,
      yAnimatedPosition,
    }),
    [item, xAnimatedPosition, yAnimatedPosition]
  );

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {renderCard(cardProps)}
      </Animated.View>
    </GestureDetector>
  );
};

export const SwipeableCardContainer = memo(
  UnmemoizedSwipeableCardContainer
) as <T>(props: SwipeableCardContainerProps<T>) => ReactElement;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
