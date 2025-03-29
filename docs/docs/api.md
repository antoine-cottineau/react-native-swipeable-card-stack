---
sidebar_position: 3
title: API
---

## Props

### Required Props

#### `data: T[]`

Array of items to be rendered as cards.

#### `swipes: SwipeDirection[]`

Array of swipe directions corresponding to each card's state.

```tsx
// Example: First two cards swiped right, third swiped left
const swipes = ['right', 'right', 'left'];
```

#### `renderCard: RenderCard<T>`

Function to render each card. Receives props containing item data and animated position values.

#### `keyExtractor: (item: T) => string`

Function to extract a unique key for each card item for performance optimization.

### Optional Props

#### Gesture Configuration

##### `allowedPanDirections?: AllowedPanDirection[]`

- Default: `['left', 'right']`
- Allowed directions for card panning (moving a card with gestures)
- Example: `['left', 'right', 'up', 'down']`

##### `allowedSwipeDirections?: AllowedPanDirection[]`

- Default: `['left', 'right']`
- Allowed directions for card swiping (validating a swipe towards a direction)
- Example: `['left', 'right', 'up', 'down']`

#### Swipe Thresholds

##### `horizontalTranslationValidationThreshold?: number`

- Default: `0.3 * windowWidth`
- Unit: points
- Minimum horizontal translation to trigger a swipe

##### `horizontalVelocityValidationThreshold?: number`

- Default: `1000`
- Unit: points/second
- Minimum horizontal velocity to trigger a swipe

##### `verticalTranslationValidationThreshold?: number`

- Default: `0.3 * windowHeight`
- Unit: points
- Minimum vertical translation to trigger a swipe

##### `verticalVelocityValidationThreshold?: number`

- Default: `1000`
- Unit: points/second
- Minimum vertical velocity to trigger a swipe

#### Card Stack Configuration

##### `numberOfUnswipedCardsToRender?: number`

- Default: `3`
- Number of cards to render beyond the swiped cards
- A value of 3 is typically sufficient to prevent blank spaces during rapid swiping

##### `horizontalRestingPosition?: number`

- Default: `screenWidth`
- Unit: points
- Final resting position for horizontal swipes

##### `verticalRestingPosition?: number`

- Default: `screenHeight`
- Unit: points
- Final resting position for vertical swipes

#### Callbacks

##### `onSwipeEnded?: (item: T, direction: SwipeDirection) => void`

Callback fired when a card swipe animation completes.

- `item`: The item that was swiped
- `direction`: The direction the card was swiped towards

#### Styling / View props

##### `style?: StyleProp<ViewStyle>`

Style prop for the container View.

##### `viewProps?: Omit<ViewProps, 'style'>`

Additional props to pass to the container View.

### Animation Configuration Props

The component also accepts all animation configuration props from `AnimationConfigs`. These include spring and timing configurations for different swipe directions. See the Animation API documentation for details.
