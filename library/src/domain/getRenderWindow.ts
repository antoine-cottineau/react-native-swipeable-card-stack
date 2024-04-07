type Params = {
  currentIndex: number
  dataLength: number
  numberOfRenderedCards: number
}

/**
 * Get the window of indexes that should have their card rendered.
 *
 * Here are the rules that this function follows:
 * - the card at `currentIndex` must be rendered
 * - `numberOfRenderedCards` unswiped cards should be rendered
 * - if `currentIndex >= 1`, one swiped card should be rendered
 * - cards with negative indexes or with indexes superior to `dataLength` shouldn't be rendered
 *
 * @returns a tuple corresponding to the range of card indexes that should be rendered (inclusive).
 */
export const getRenderWindow = ({
  currentIndex,
  dataLength,
  numberOfRenderedCards,
}: Params): [number, number] => [
  Math.max(currentIndex - 1, 0),
  Math.min(currentIndex + numberOfRenderedCards, dataLength - 1),
]
