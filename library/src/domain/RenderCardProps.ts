import { type SharedValue } from 'react-native-reanimated'

export type RenderCardProps<T> = T & RenderCardAddedProps

export type RenderCardAddedProps = {
  /**
   * The index of the card in the stack.
   */
  index: number

  /**
   * A reanimated [SharedValue](https://docs.swmansion.com/react-native-reanimated/docs/core/useSharedValue/) that is synced with the swipe animation of the current card and can be used to perform custom animations.
   */
  animationPosition: SharedValue<number>

  /**
   * The index of the card that is currently on the top of the stack.
   */
  currentIndex: number
}
