---
sidebar_position: 3
title: API
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

### Swipe Animations

Animations used when a card is actively being swiped in a specific direction.
Default: Timing animation

| Prop                       | Type               | Description                                       |
| -------------------------- | ------------------ | ------------------------------------------------- |
| `unknownSwipeTimingConfig` | `WithTimingConfig` | Timing animation when swipe direction is unknown. |
| `unknownSwipeSpringConfig` | `WithSpringConfig` | Spring animation when swipe direction is unknown. |
| `leftSwipeTimingConfig`    | `WithTimingConfig` | Timing animation for left swipes.                 |
| `leftSwipeSpringConfig`    | `WithSpringConfig` | Spring animation for left swipes.                 |
| `rightSwipeTimingConfig`   | `WithTimingConfig` | Timing animation for right swipes.                |
| `rightSwipeSpringConfig`   | `WithSpringConfig` | Spring animation for right swipes.                |
| `topSwipeTimingConfig`     | `WithTimingConfig` | Timing animation for top swipes.                  |
| `topSwipeSpringConfig`     | `WithSpringConfig` | Spring animation for top swipes.                  |
| `bottomSwipeTimingConfig`  | `WithTimingConfig` | Timing animation for bottom swipes.               |
| `bottomSwipeSpringConfig`  | `WithSpringConfig` | Spring animation for bottom swipes.               |

### Validation Animations

Triggered when a gesture ends and meets swipe threshold criteria.
Default: Spring animation

| Prop                                | Type                          | Description                                    |
| ----------------------------------- | ----------------------------- | ---------------------------------------------- |
| `validationLeftSwipeTimingConfig`   | `(event) => WithTimingConfig` | Timing animation for validating left swipes.   |
| `validationLeftSwipeSpringConfig`   | `(event) => WithSpringConfig` | Spring animation for validating left swipes.   |
| `validationRightSwipeTimingConfig`  | `(event) => WithTimingConfig` | Timing animation for validating right swipes.  |
| `validationRightSwipeSpringConfig`  | `(event) => WithSpringConfig` | Spring animation for validating right swipes.  |
| `validationTopSwipeTimingConfig`    | `(event) => WithTimingConfig` | Timing animation for validating top swipes.    |
| `validationTopSwipeSpringConfig`    | `(event) => WithSpringConfig` | Spring animation for validating top swipes.    |
| `validationBottomSwipeTimingConfig` | `(event) => WithTimingConfig` | Timing animation for validating bottom swipes. |
| `validationBottomSwipeSpringConfig` | `(event) => WithSpringConfig` | Spring animation for validating bottom swipes. |

### Reset Animations

Used when a card needs to return to its initial position.
Default: Timing animation

| Prop                     | Type               | Description                                         |
| ------------------------ | ------------------ | --------------------------------------------------- |
| `resetSwipeTimingConfig` | `WithTimingConfig` | Timing animation for resetting to initial position. |
| `resetSwipeSpringConfig` | `WithSpringConfig` | Spring animation for resetting to initial position. |

### Cancel Animations

Triggered when a swipe gesture ends without meeting the threshold criteria.
Default: Timing animation

| Prop                                  | Type                          | Description                                         |
| ------------------------------------- | ----------------------------- | --------------------------------------------------- |
| `canceledHorizontalSwipeTimingConfig` | `(event) => WithTimingConfig` | Timing animation when horizontal swipe is canceled. |
| `canceledHorizontalSwipeSpringConfig` | `(event) => WithSpringConfig` | Spring animation when horizontal swipe is canceled. |
| `canceledVerticalSwipeTimingConfig`   | `(event) => WithTimingConfig` | Timing animation when vertical swipe is canceled.   |
| `canceledVerticalSwipeSpringConfig`   | `(event) => WithSpringConfig` | Spring animation when vertical swipe is canceled.   |
