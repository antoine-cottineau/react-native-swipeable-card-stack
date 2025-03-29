---
sidebar_position: 1
title: Presentation
---

# React Native Swipeable Card Stack

A powerful and highly customizable React Native library that lets you implement Tinder-like swipeable card stacks with ease. Built with [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) and [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/), this library provides smooth animations and precise gesture controls for an exceptional user experience.

## Key Features

- 🎯 **Multi-directional Swipes** - Support for left, right, top, and bottom swipes
- 🎮 **Fully Controlled** - Simple state management through props, no refs or imperative handling needed - just provide your data and swipe states
- ✨ **Fluid Animations** - Smooth, native-powered animations using React Native Reanimated
- 🎨 **Highly Customizable** - Extensive configuration options for animations, gestures, and styling
- 📱 **Cross-Platform** - Works seamlessly on iOS, Android, and Web
- 🔒 **Direction Locking** - Optional pan direction locking for controlled user interactions
- 🎬 **Flexible Animation Configs** - Choose between spring and timing animations with full customization
- 🔄 **Configurable Stack** - Control the number of visible cards in the stack

## Demo

[Your demo video will go here]

## Quick Start

Start by installing required peer dependencies: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/) and [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation).

Then install react-native-swipeable-card-stack:

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

Ready to create engaging card-based interactions in your app? Start by having a look at the [SwipeableCardStack's documentation page](./SwipeableCardStack) to explore all available features and customization options!
