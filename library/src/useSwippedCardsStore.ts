import { useRef } from 'react'
import { type SwipeDirection } from '.'

/**
 * A hook that stores the directions in which swipped cards were swipped.
 *
 * - to get the direction of a swipped card, call `getSwippedCardSwipeDirection`
 * - when a card gets swipped, call `pushSwippedCard`
 * - when a card gets unswipped, call `popSwippedCard`
 */
export const useSwippedCardsStore = () => {
  const ref = useRef<SwipeDirection[]>([])

  const getSwippedCardSwipeDirection = (index: number) => ref.current[index]

  const pushSwippedCard = (swipeDirection: SwipeDirection) => {
    ref.current = [...ref.current, swipeDirection]
  }

  const popSwippedCard = () => {
    ref.current = ref.current.slice(0, -1)
  }

  return {
    getSwippedCardSwipeDirection,
    pushSwippedCard,
    popSwippedCard,
  }
}
