---
sidebar_position: 3
title: SwipeableCardStack
---

# SwipeableCardStack Component

## Core Props

### Required Props

| Prop           | Type                  | Description                                                                                     |
| -------------- | --------------------- | ----------------------------------------------------------------------------------------------- |
| `data`         | `T[]`                 | Array of items to be rendered as cards.                                                         |
| `swipes`       | `SwipeDirection[]`    | Array of swipe directions corresponding to each card's state.                                   |
| `renderCard`   | `RenderCard<T>`       | Function to render each card. Receives props containing item data and animated position values. |
| `keyExtractor` | `(item: T) => string` | Function to extract a unique key for each card item.                                            |

### Optional Props

#### Gesture Configuration

| Prop                     | Type                    | Default             | Description                                                          |
| ------------------------ | ----------------------- | ------------------- | -------------------------------------------------------------------- |
| `allowedPanDirections`   | `AllowedPanDirection[]` | `['left', 'right']` | Allowed directions for card panning i.e moving a card with gestures. |
| `allowedSwipeDirections` | `AllowedPanDirection[]` | `['left', 'right']` | Allowed directions for card swiping i.e. validating a swipe.         |

#### Swipe Thresholds

| Prop                                       | Type     | Default              | Unit          | Description                                        |
| ------------------------------------------ | -------- | -------------------- | ------------- | -------------------------------------------------- |
| `horizontalTranslationValidationThreshold` | `number` | `0.3 * windowWidth`  | points        | Minimum horizontal translation to trigger a swipe. |
| `horizontalVelocityValidationThreshold`    | `number` | `1000`               | points/second | Minimum horizontal velocity to trigger a swipe.    |
| `verticalTranslationValidationThreshold`   | `number` | `0.3 * windowHeight` | points        | Minimum vertical translation to trigger a swipe.   |
| `verticalVelocityValidationThreshold`      | `number` | `1000`               | points/second | Minimum vertical velocity to trigger a swipe.      |

#### Stack Configuration

| Prop                            | Type     | Default        | Description                                        |
| ------------------------------- | -------- | -------------- | -------------------------------------------------- |
| `numberOfUnswipedCardsToRender` | `number` | `3`            | Number of cards to render beyond the swiped cards. |
| `horizontalRestingPosition`     | `number` | `screenWidth`  | Final resting position for horizontal swipes.      |
| `verticalRestingPosition`       | `number` | `screenHeight` | Final resting position for vertical swipes.        |

#### Event Callbacks

| Prop           | Type                                           | Description                                           |
| -------------- | ---------------------------------------------- | ----------------------------------------------------- |
| `onSwipeEnded` | `(item: T, direction: SwipeDirection) => void` | Callback fired when a card swipe animation completes. |

#### Styling

| Prop        | Type                       | Description                                     |
| ----------- | -------------------------- | ----------------------------------------------- |
| `style`     | `StyleProp<ViewStyle>`     | Style prop for the container View.              |
| `viewProps` | `Omit<ViewProps, 'style'>` | Additional props to pass to the container View. |

## Animation Configurations

All animations use either `WithSpringConfig` or `WithTimingConfig` from React Native Reanimated:

- [WithSpringConfig Documentation](https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring#config-object-properties)
- [WithTimingConfig Documentation](https://docs.swmansion.com/react-native-reanimated/docs/animations/withTiming#config-object-properties)

### Directional Swipe Animations

#### Timing Configurations

| Prop                      | Default          | Description                        |
| ------------------------- | ---------------- | ---------------------------------- |
| `leftSwipeTimingConfig`   | Spring animation | Timing animation for left swipes   |
| `rightSwipeTimingConfig`  | Spring animation | Timing animation for right swipes  |
| `topSwipeTimingConfig`    | Spring animation | Timing animation for top swipes    |
| `bottomSwipeTimingConfig` | Spring animation | Timing animation for bottom swipes |

#### Spring Configurations

| Prop                      | Default          | Description                        |
| ------------------------- | ---------------- | ---------------------------------- |
| `leftSwipeSpringConfig`   | Timing animation | Spring animation for left swipes   |
| `rightSwipeSpringConfig`  | Timing animation | Spring animation for right swipes  |
| `topSwipeSpringConfig`    | Timing animation | Spring animation for top swipes    |
| `bottomSwipeSpringConfig` | Timing animation | Spring animation for bottom swipes |

### Validation Animations

Triggered when a gesture ends and meets swipe threshold criteria.

#### Timing Configurations

| Prop                                | Default          | Description                            |
| ----------------------------------- | ---------------- | -------------------------------------- |
| `validationLeftSwipeTimingConfig`   | Spring animation | Validation animation for left swipes   |
| `validationRightSwipeTimingConfig`  | Spring animation | Validation animation for right swipes  |
| `validationTopSwipeTimingConfig`    | Spring animation | Validation animation for top swipes    |
| `validationBottomSwipeTimingConfig` | Spring animation | Validation animation for bottom swipes |

#### Spring Configurations

| Prop                                | Default          | Description                         |
| ----------------------------------- | ---------------- | ----------------------------------- |
| `validationLeftSwipeSpringConfig`   | Timing animation | Spring validation for left swipes   |
| `validationRightSwipeSpringConfig`  | Timing animation | Spring validation for right swipes  |
| `validationTopSwipeSpringConfig`    | Timing animation | Spring validation for top swipes    |
| `validationBottomSwipeSpringConfig` | Timing animation | Spring validation for bottom swipes |

### Reset Animations

Used when a card returns to its initial position.

| Prop                     | Default          | Description                |
| ------------------------ | ---------------- | -------------------------- |
| `resetSwipeTimingConfig` | Spring animation | Timing animation for reset |
| `resetSwipeSpringConfig` | Timing animation | Spring animation for reset |

## Example Usage

```tsx
<SwipeableCardStack
  // Core props
  data={cards}
  swipes={['right', 'left']}
  renderCard={Card}
  keyExtractor={(item) => item.id}
  // Gesture configuration
  allowedPanDirections={['left', 'right', 'up', 'down']}
  // Animation configurations
  leftSwipeSpringConfig={{
    damping: 10,
    mass: 1,
    stiffness: 100,
  }}
  validationRightSwipeTimingConfig={(event) => ({
    duration: 300,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  })}
  resetSwipeSpringConfig={{
    damping: 15,
    mass: 1,
    stiffness: 150,
  }}
/>
```
