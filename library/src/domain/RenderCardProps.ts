import { type SharedValue } from 'react-native-reanimated'

export type RenderCardProps<T> = T & RenderCardAddedProps

export type RenderCardAddedProps = {
  /**
   * The index of the card in the stack.
   */
  index: number

  /**
   * A reanimated [SharedValue](https://docs.swmansion.com/react-native-reanimated/docs/core/useSharedValue/) that is synced with the swipe x position of the current card and can be used to perform custom animations.
   *
   * The value runs between -1 (the card is totally swipped to the left) and 1 (the card is totally swipped to the right).
   *
   * A value of 0 means the card is at its resting x position.
   */
  xAnimationPosition: SharedValue<number>

  /**
   * The index of the card that is currently on the top of the stack.
   */
  currentIndex: number
}
