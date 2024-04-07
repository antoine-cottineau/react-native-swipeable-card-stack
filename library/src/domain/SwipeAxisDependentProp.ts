import { allAxis, type SwipeAxis } from './SwipeAxis'

export type SwipeAxisDependentProp<T> = T | Record<SwipeAxis, T>

export const extractSwipeAxisDependentPropValue = <T>(
  prop: SwipeAxisDependentProp<T>,
  axis: SwipeAxis,
) => {
  if (isRecordOfSwipeAxis(prop)) {
    return prop[axis]
  }
  return prop
}

const isRecordOfSwipeAxis = <T>(
  value: unknown,
): value is Record<SwipeAxis, T> => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  return allAxis.every((axis) => axis in value)
}
