---
sidebar_position: 4
title: Performance
---

## Optimizing Performance

When using `react-native-swipeable-card-stack`, there are several ways to optimize your app's performance. The most important optimization is to memoize your card component.

### Memoizing Card Components

By default, React will re-render child components whenever their parent re-renders. In the context of a card stack, this means every card could potentially re-render when a swipe occurs, even if the card's data hasn't changed.

Here's how to properly memoize your card component:

```tsx
import { memo, useState } from 'react';
import { View, Text } from 'react-native';
import {
  SwipeableCardStack,
  type CardProps,
  type SwipeDirection,
} from 'react-native-swipeable-card-stack';

type CardItem = {
  id: string;
  title: string;
};

const cards: CardItem[] = [
  { id: '1', title: 'Swipe me!' },
  { id: '2', title: 'Next card' },
  { id: '3', title: 'Last one' },
];

const Card = memo(({ item }: CardProps<CardItem>) => (
  <View>
    <Text>{item.title}</Text>
  </View>
));

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

By memoizing the Card component, only the cards that actually need to update (such as the currently swiped card) will re-render when a swipe occurs. This can significantly improve performance, especially when dealing with complex card layouts or large datasets.

### Additional Tips

- Keep your card components as lightweight as possible
- If your card contains expensive computations, consider using `useMemo` for those specific values
- Ensure images in cards are properly cached and optimized
