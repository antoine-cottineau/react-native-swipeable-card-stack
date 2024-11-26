import { type SwipeDirection } from './SwipeDirection'

type Params = {
  xTranslation: number
  yTranslation: number
  xEndedSwipePosition: number
  yEndedSwipePosition: number
}

export const getSwipeDirection = ({
  xTranslation,
  yTranslation,
  xEndedSwipePosition,
  yEndedSwipePosition,
}: Params): SwipeDirection => {
  'worklet'
  const horizontalRatio = Math.abs(xTranslation / xEndedSwipePosition)
  const verticalRatio = Math.abs(yTranslation / yEndedSwipePosition)

  if (horizontalRatio >= verticalRatio) {
    return xTranslation >= 0 ? 'right' : 'left'
  }
  return yTranslation >= 0 ? 'bottom' : 'top'
}
