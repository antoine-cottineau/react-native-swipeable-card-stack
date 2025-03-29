---
sidebar_position: 3
title: Animation Configurations
---

# Animation Configurations

The SwipeableCardStack component provides extensive animation customization through spring and timing animations. Each animation type can be configured for different swipe scenarios.

## Animation Types

All animation configurations use either `WithSpringConfig` or `WithTimingConfig` from React Native Reanimated:

- [WithSpringConfig Documentation](https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring#config-object-properties)
- [WithTimingConfig Documentation](https://docs.swmansion.com/react-native-reanimated/docs/animations/withTiming#config-object-properties)

## Swipe Animations

### Timing Animations

Called when a swipe is initiated in a specific direction.

#### `leftSwipeTimingConfig?: (event: GestureStateChangeEvent) => WithTimingConfig`

- Default: spring animation is used
- Configures timing animation for left swipes

#### `rightSwipeTimingConfig?: (event: GestureStateChangeEvent) => WithTimingConfig`

- Default: spring animation is used
- Configures timing animation for right swipes

#### `topSwipeTimingConfig?: (event: GestureStateChangeEvent) => WithTimingConfig`

- Default: spring animation is used
- Configures timing animation for top swipes

#### `bottomSwipeTimingConfig?: (event: GestureStateChangeEvent) => WithTimingConfig`

- Default: spring animation is used
- Configures timing animation for bottom swipes

### Spring Animations

#### `leftSwipeSpringConfig?: WithSpringConfig`

- Default: timing animation is used
- Configures spring animation for left swipes

#### `rightSwipeSpringConfig?: WithSpringConfig`

- Default: timing animation is used
- Configures spring animation for right swipes

#### `topSwipeSpringConfig?: WithSpringConfig`

- Default: timing animation is used
- Configures spring animation for top swipes

#### `bottomSwipeSpringConfig?: WithSpringConfig`

- Default: timing animation is used
- Configures spring animation for bottom swipes

## Validation Animations

These animations are triggered when a gesture ends and meets the swipe threshold criteria.

### Timing Animations

#### `validationLeftSwipeTimingConfig?: (event: GestureStateChangeEvent) => WithTimingConfig`

- Default: spring animation is used
- Called when gesture ends and either translation or velocity threshold is met for left direction

#### `validationRightSwipeTimingConfig?: (event: GestureStateChangeEvent) => WithTimingConfig`

- Default: spring animation is used
- Called when gesture ends and swipe threshold is met for right direction

#### `validationTopSwipeTimingConfig?: (event: GestureStateChangeEvent) => WithTimingConfig`

- Default: spring animation is used
- Called when gesture ends and swipe threshold is met for top direction

#### `validationBottomSwipeTimingConfig?: (event: GestureStateChangeEvent) => WithTimingConfig`

- Default: spring animation is used
- Called when gesture ends and swipe threshold is met for bottom direction

### Spring Animations

#### `validationLeftSwipeSpringConfig?: WithSpringConfig`

- Default: timing animation is used
- Spring configuration for validating left swipes

#### `validationRightSwipeSpringConfig?: WithSpringConfig`

- Default: timing animation is used
- Spring configuration for validating right swipes

#### `validationTopSwipeSpringConfig?: WithSpringConfig`

- Default: timing animation is used
- Spring configuration for validating top swipes

#### `validationBottomSwipeSpringConfig?: WithSpringConfig`

- Default: timing animation is used
- Spring configuration for validating bottom swipes

## Reset Animations

These animations are used when a card returns to its initial position.

### Timing Animation

#### `resetSwipeTimingConfig?: (event: GestureStateChangeEvent) => WithTimingConfig`

- Default: spring animation is used
- Called when card needs to return to initial position

### Spring Animation

#### `resetSwipeSpringConfig?: WithSpringConfig`

- Default: timing animation is used
- Spring configuration for returning card to initial position

## Example Usage

```tsx
<SwipeableCardStack
  // ... other props

  // Swipe animations
  leftSwipeSpringConfig={{
    damping: 10,
    mass: 1,
    stiffness: 100,
  }}
  // Validation animations
  validationRightSwipeTimingConfig={(event) => ({
    duration: 300,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  })}
  // Reset animation
  resetSwipeSpringConfig={{
    damping: 15,
    mass: 1,
    stiffness: 150,
  }}
/>
```

## Default Behavior

- If no animation configuration is provided for a specific direction or action, the component will use its default animation type (spring or timing as specified in each prop's documentation)
- You can mix and match spring and timing animations for different directions and scenarios
- The event parameter in timing configurations provides access to gesture data like velocity and translation, allowing for dynamic animation configurations
