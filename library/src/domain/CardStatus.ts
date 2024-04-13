export type CardStatus = 'swiped' | 'current' | 'unswiped'

type GetStatusParams = {
  index: number
  currentIndex: number
}

export const getStatus = ({
  index,
  currentIndex,
}: GetStatusParams): CardStatus => {
  if (index < currentIndex) {
    return 'swiped'
  }
  if (index === currentIndex) {
    return 'current'
  }
  return 'unswiped'
}
