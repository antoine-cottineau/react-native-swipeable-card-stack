---
sidebar_position: 2
title: Getting Started
---

A component that renders a stack of swipeable cards with customizable swipe directions, animations, and gesture handling.

## Basic Example

```tsx
const items = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
];

const itemSwipes = ['right', 'left']; // First item swiped right, second left

<SwipeableCardStack
  data={items}
  swipes={itemSwipes}
  renderCard={({ item }) => (
    <View style={styles.card}>
      <Text>{item.title}</Text>
    </View>
  )}
  keyExtractor={(item) => item.id}
  onSwipeEnded={(item, direction) => console.log(`Item swiped ${direction}`)}
/>;
```
