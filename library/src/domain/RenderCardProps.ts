import { type SharedValue } from 'react-native-reanimated'
import { type CardStatus } from './CardStatus'

export type RenderCardProps<T> = T & RenderCardAddedProps

export type RenderCardAddedProps = {
  /**
   * The index of the card in the stack.
   */
  index: number

  /**
   * Whether the card has been `swiped`, is the `current` one or is `unswiped` (and not the current one).
   */
  status: CardStatus

  /**
   * A reanimated [SharedValue](https://docs.swmansion.com/react-native-reanimated/docs/core/useSharedValue/) that is synced with the swipe x position of the current card and can be used to perform custom animations.
   *
   * The value runs between -1 (the card is totally swiped to the left) and 1 (the card is totally swiped to the right).
   *
   * A value of 0 means the card is at its resting x position.
   */
  xAnimationPosition: SharedValue<number>

  /**
   * A reanimated [SharedValue](https://docs.swmansion.com/react-native-reanimated/docs/core/useSharedValue/) that is synced with the swipe y position of the current card and can be used to perform custom animations.
   *
   * The value runs between -1 (the card is totally swiped to the top) and 1 (the card is totally swiped to the bottom).
   *
   * A value of 0 means the card is at its resting y position.
   */
  yAnimationPosition: SharedValue<number>
}
