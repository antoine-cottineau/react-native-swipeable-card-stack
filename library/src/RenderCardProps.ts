import { type SharedValue } from 'react-native-reanimated'

export type RenderCardProps<T> = T & RenderCardAddedProps

export type RenderCardAddedProps = {
  index: number
  animationPosition: SharedValue<number>
  currentIndex: number
}
