import { useRef } from 'react'
import { type SwipeDirection } from '..'

/**
 * A hook that stores the directions in which swiped cards were swiped.
 *
 * - to get the direction of a swiped card, call `getSwipedCardSwipeDirection`
 * - when a card gets swiped, call `pushSwipedCard`
 * - when a card gets unswiped, call `popSwipedCard`
 */
export const useSwipedCardsStore = () => {
  const ref = useRef<SwipeDirection[]>([])

  const getSwipedCardSwipeDirection = (index: number) => ref.current[index]

  const pushSwipedCard = (swipeDirection: SwipeDirection) => {
    ref.current = [...ref.current, swipeDirection]
  }

  const popSwipedCard = () => {
    ref.current = ref.current.slice(0, -1)
  }

  return {
    getSwipedCardSwipeDirection,
    pushSwipedCard,
    popSwipedCard,
  }
}
