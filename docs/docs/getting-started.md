---
sidebar_position: 2
title: Getting Started
---

## Installation

Start by installing required peer dependencies: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/) and [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation).

Then install `react-native-swipeable-card-stack`:

```bash
# using npm
npm install react-native-swipeable-card-stack
# or yarn
yarn add react-native-swipeable-card-stack
```

## Basic Usage

```tsx
import {
  SwipeableCardStack,
  type SwipeDirection,
  type CardProps,
} from 'react-native-swipeable-card-stack';
import { useState } from 'react';

type CardItem = {
  id: string;
  title: string;
};

const cards: CardItem[] = [
  { id: '1', title: 'Swipe me!' },
  { id: '2', title: 'Next card' },
  { id: '3', title: 'Last one' },
];

const Card = ({ item }: CardProps<CardItem>) => (
  <View>
    <Text>{item.title}</Text>
  </View>
);

const CardStack = () => {
  const [swipes, setSwipes] = useState<SwipeDirection[]>(['right']); // First card already swiped right

  return (
    <SwipeableCardStack<CardItem>
      data={cards}
      swipes={swipes}
      renderCard={Card}
      keyExtractor={(item) => item.id}
      onSwipeEnded={(_, direction) =>
        setSwipes((current) => [...current, direction])
      }
    />
  );
};
```

Check out the [API Reference](./api) for detailed information about available props and customization options.

For a complete implementation example, see our [example project](https://github.com/antoine-cottineau/react-native-swipeable-card-stack/tree/v2/example).
