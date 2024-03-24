import styled from '@emotion/native'
import {
  forwardRef,
  useImperativeHandle,
  useState,
  type ForwardedRef,
} from 'react'
import { type SwipeableCardStackOptions } from './SwipeableCardStackOptions'
import { SwipeableCardWrapper } from './SwipeableCardWrapper'
import { toReversed } from './toReversed'
import { useDefaultOptions } from './useDefaultOptions'
import { useRefMap } from './useRefMap'
import { type SwipeableCardStackProps } from '.'

export type SwipeableCardRef = {
  swipeLeft: () => void
  swipeRight: () => void
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

  const options: SwipeableCardStackOptions = {
    ...userOptions,
    ...defaultOptions,
  }

  useImperativeHandle(
    ref,
    () => ({
      swipeLeft: () => {
        refMap.get(currentIndex)?.swipeLeft()
      },
      swipeRight: () => {
        refMap.get(currentIndex)?.swipeRight()
      },
    }),
    [refMap, currentIndex],
  )

  return (
    <Container>
      {toReversed(data).map((cardData, reverseIndex) => {
        const index = data.length - reverseIndex - 1

        const hasCardBeenSwiped = index < currentIndex
        const shouldNotRenderCardYet =
          index > currentIndex + options.numberOfRenderedCards - 1
        if (hasCardBeenSwiped || shouldNotRenderCardYet) {
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
