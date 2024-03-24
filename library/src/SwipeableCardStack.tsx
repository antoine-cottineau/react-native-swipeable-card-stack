import styled from '@emotion/native'
import {
  forwardRef,
  useImperativeHandle,
  useState,
  type ForwardedRef,
} from 'react'
import { type SwipeableCardStackOptions } from './SwipeableCardStackOptions'
import { SwipeableCardWrapper } from './SwipeableCardWrapper'
import { getRenderWindow } from './getRenderWindow'
import { toReversed } from './toReversed'
import { useDefaultOptions } from './useDefaultOptions'
import { useRefMap } from './useRefMap'
import { useSwippedCardsStore } from './useSwippedCardsStore'
import { type SwipeableCardStackProps } from '.'

export type SwipeableCardRef = {
  swipeLeft: () => void
  swipeRight: () => void
  unswipe: () => void
}

export const SwipeableCardStack = forwardRef(function SwipeableCardStack<T>(
  {
    data,
    renderCard,
    cardWrapperStyle,
    onActiveCardUpdate,
    ...userOptions
  }: SwipeableCardStackProps<T>,
  ref: ForwardedRef<SwipeableCardRef>,
) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const refMap = useRefMap<number, SwipeableCardRef>()
  const defaultOptions = useDefaultOptions()
  const { getSwippedCardSwipeDirection, pushSwippedCard, popSwippedCard } =
    useSwippedCardsStore()

  const options: SwipeableCardStackOptions = {
    ...userOptions,
    ...defaultOptions,
  }
  const [renderWindowMinIndex, renderWindowMaxIndex] = getRenderWindow({
    currentIndex,
    dataLength: data.length,
    numberOfRenderedCards: options.numberOfRenderedCards,
  })

  useImperativeHandle(
    ref,
    () => ({
      swipeLeft: () => {
        refMap.get(currentIndex)?.swipeLeft()
      },
      swipeRight: () => {
        refMap.get(currentIndex)?.swipeRight()
      },
      unswipe: () => {
        if (currentIndex === 0) {
          return
        }
        setCurrentIndex((index) => index - 1)
        refMap.get(currentIndex - 1)?.unswipe()
        popSwippedCard()
      },
    }),
    [refMap, currentIndex, popSwippedCard],
  )

  return (
    <Container>
      {toReversed(data).map((cardData, reverseIndex) => {
        const index = data.length - reverseIndex - 1

        if (index < renderWindowMinIndex || index > renderWindowMaxIndex) {
          return null
        }

        return (
          <SwipeableCardWrapper
            ref={(ref) => {
              refMap.initRef(index, ref)
            }}
            renderCard={(renderCardAddedProps) =>
              renderCard({ ...cardData, ...renderCardAddedProps })
            }
            index={index}
            currentIndex={currentIndex}
            cardWrapperStyle={cardWrapperStyle}
            onCardSwipeStatusUpdated={(swipeStatus) => {
              if (swipeStatus.phase === 'ended') {
                setCurrentIndex((index) => index + 1)
                pushSwippedCard(swipeStatus.direction)
              }
              if (index === currentIndex) {
                const currentDataItem = data[currentIndex]
                if (currentDataItem === undefined) {
                  throw new Error(
                    `Attempted to access data item at index ${currentIndex} while data has size ${data.length}.`,
                  )
                }
                onActiveCardUpdate?.({
                  ...swipeStatus,
                  currentIndex,
                  currentDataItem,
                })
              }
            }}
            options={options}
            initialSwipeDirection={getSwippedCardSwipeDirection(index)}
            key={index}
          />
        )
      })}
    </Container>
  )
})

const Container = styled.View({
  flex: 1,
})
