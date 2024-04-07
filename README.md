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

First, follow [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/) and [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation/) installation guides.

Then install the library through npm:

### Expo

```sh
expo install react-native-swipeable-card-stack
```

### Bare React Native

```sh
yarn add react-native-swipeable-card-stack
```

## Documentation

This library exports a `SwipeableCardStack` component that displays the cards, reacts to user gestures, performs some animations and send swipping events.

Here is the list of props this component accepts:

### SwipeableCardStack's props

<!-- prettier-ignore -->
| Name | Type | Description | Default value |
| - | - | - | - |
| data | `T` (generic) | **[Mandatory]** An array of data items that will be passed to `renderCard`. |
| renderCard |  `RenderCardProps -> ReactNode` | **[Mandatory]** A function that render a card based on the provided data and helpful information (see [RenderCardProps](https://github.com/antoine-cottineau/react-native-swipeable-card-stack/blob/main/library/src/RenderCardProps.ts)). |
| cardWrapperStyle | `StyleProp<ViewStyle>` | An optional `ViewStyle` that will be applied to the wrapper component of every card. | `undefined` |
| numberOfRenderedCards | `number` | How many cards should be rendered at the same time. To improve performance, *react-native-swipeable-card-stack* does not render all the cards. This has usually no visual impact from a user standpoint because most of the cards are hidden by the two first cards of the stack. However, if you encounter a case where some cards are not visible, you may want to increase this value. | `3` |
| endedSwipePosition | `number` | The position where the cards rest at the end of a swipe. For example, if you set `endedSwipePosition` to 400, a card swiped to the left will end its movement at -400 while a card swiped to the right will end its movement at +400. Before any swipe, the cards sit idle at the position 0. | `1.5 * screenWidth` |
| validateSwipeTranslationThreshold | `number` | The translation needed for a swipe to be considered as validated, which means that if the user releases the card, the swipe animation will finish and the swipe will be completed. For example, if you set `validatedSwipeTranslationThreshold` to 200 and the user swipes 190 to the right and releases the card, the swipe will be aborted. Hovewer, if the user swipes 210 to the right, the swipe will complete. Note that the same behaviour is valid on the left side (negative positions). A swipe can also be validated if the velocity is high enough, see `validateSwipeVelocityThreshold`. | `0.5 * screenWidth` |
| validateSwipeVelocityThreshold | `number` | The velocity needed for a swipe to be validated. A swipe can also be validated if the translation is high enough, see `validateSwipeTranslationThreshold`. | `800` |
| validateSwipeVelocityThreshold | `number` | A function that returns a reanimated [SpringConfig](https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring/) that will be used in the final animation once a swipe is validated. | see *useDefaultOptions.ts* |
| imperativeSwipeAnimationConfig | `WithTimingConfig` | A reanimated [TimingConfig](https://docs.swmansion.com/react-native-reanimated/docs/animations/withTiming) that is used when the card is imperatively swiped via `ref.swipeLeft` or `ref.swipeRight`. | `undefined` |
| stoppedSwipeAnimationConfig | `WithTimingConfig` | A reanimated [TimingConfig](https://docs.swmansion.com/react-native-reanimated/docs/animations/withTiming) that is used when the swipe is stopped without being validated and the card position gets reset. | `undefined` |

### SwipeableCardStack's ref

If you declare a ref and pass it to `SwipeableCardStack` you can imperatively call these functions:

- `swipeLeft`
- `swipeRight`

Here is a basic example:

```typescript
const CatStack = () => {
  const ref = useRef<SwipeableCardRef>(null)

  return (
    <>
      <SwipeableCardStack
        data={[
          { name: 'Felix', age: 6 },
          { name: 'Lily', age: 3 },
          { name: 'Diego', age: 2 },
        ]}
        renderCard={CatCard}
        ref={ref}
      />
      <Button
        title="Swipe left"
        onPress={() => {
          ref.current?.swipeLeft()
        }}
      />
    </>
  )
}
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
