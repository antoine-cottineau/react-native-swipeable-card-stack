import { type ReactNode } from 'react'
import { type StyleProp, type ViewStyle } from 'react-native'
import {
  type RenderCardProps,
  type SwipeUpdate,
  type SwipeableCardStackOptions,
} from '..'

export type SwipeableCardStackProps<T> = {
  /**
   * An array of data items that will be passed to `renderCard`.
   */
  data: T[]

  /**
   * A function that render a card based on the provided data and helpful information (see [RenderCardProps](https://github.com/antoine-cottineau/react-native-swipeable-card-stack/blob/main/library/src/RenderCardProps.ts)).
   */
  renderCard: (params: RenderCardProps<T>) => ReactNode

  /**
   * An optional `ViewStyle` that will be applied to the wrapper component of every card.
   *
   * Default value: `undefined`
   */
  cardWrapperStyle?: StyleProp<ViewStyle>

  /**
   * An optional function that will be triggered everytime a swipe update occurs.
   *
   * This is where you should listen for important updates such as a validated swipe.
   *
   * Default value: `undefined`
   */
  onActiveCardUpdate?: (swipeUpdate: SwipeUpdate<T>) => void
} & Partial<SwipeableCardStackOptions>
