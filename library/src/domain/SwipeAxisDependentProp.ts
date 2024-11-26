import { allAxis, type SwipeAxis } from './SwipeAxis'

export type SwipeAxisDependentProp<T> = T | Record<SwipeAxis, T>

export const extractPropValue = <T>(
  prop: SwipeAxisDependentProp<T>,
  axis: SwipeAxis,
) => {
  'worklet'
  // I'm forced to inline the check as extracting it in a function crashes the app
  if (
    (<T>(value: unknown): value is Record<SwipeAxis, T> => {
      if (typeof value !== 'object' || value === null) {
        return false
      }

      return allAxis.every((axis) => axis in value)
    })(prop)
  ) {
    return prop[axis]
  }
  return prop
}
