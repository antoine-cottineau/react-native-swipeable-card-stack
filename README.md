# React Native Swipeable Card Stack

Implement a swipeable card stack, similar to Tinder, with ease.

This library is based on [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) and on [react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler).

TODO: screenshots/gifs

## Features

- ⏳ Support swipes to the left, right, top, and bottom
- ⏳ Support unswipes
- ⏳ Support locking card translation along the x or y axis
- ✅ Support customizing each animation
- ✅ Allow performing your own animations on the cards based on the swipe/unswipe progression

## Basic example

```typescript
const CatStack = () => (
  <SwipeableCardStack
    data={[
      { name: 'Felix', age: 6 },
      { name: 'Lily', age: 3 },
      { name: 'Diego', age: 2 },
    ]}
    renderCard={CatCard}
  />
)

// Example card component, you can get as complex as you want
const CatCard = ({ name, age }: { name: string; age: number }) => (
  <View>
    <Text>{`${name} - ${age}`}</Text>
  </View>
)
```

To see a more complete implementation, check out the [example app](./example-app/).

## Installation

### Expo

```sh
expo install react-native-reanimated react-native-gesture-handler react-native-swipeable-card-stack
```

### Bare React Native

```sh
yarn add react-native-reanimated react-native-gesture-handler react-native-swipeable-card-stack
```

TODO: complete instructions

## Documentation

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
