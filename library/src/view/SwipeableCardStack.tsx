import {
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
  type ForwardedRef,
} from 'react'
import { StyleSheet, View } from 'react-native'
import { type SwipeableCardRef, type SwipeableCardStackProps } from '..'
import { getStatus } from '../domain/CardStatus'
import { getRenderWindow } from '../domain/getRenderWindow'
import { toReversed } from '../utils/toReversed'
import { useRefMap } from '../utils/useRefMap'
import { type SwipeableCardStackOptions } from './SwipeableCardStackOptions'
import { SwipeableCardWrapper } from './SwipeableCardWrapper'
import { useDefaultOptions } from './useDefaultOptions'
import { useSwipedCardsStore } from './useSwipedCardsStore'

const SwipeableCardStackMemo = forwardRef(function SwipeableCardStack<T>(
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
  const { getSwipedCardSwipeDirection, pushSwipedCard, popSwipedCard } =
    useSwipedCardsStore()

  const options: SwipeableCardStackOptions = {
    ...defaultOptions,
    ...userOptions,
  }
  const [renderWindowMinIndex, renderWindowMaxIndex] = getRenderWindow({
    currentIndex,
    dataLength: data.length,
    numberOfRenderedCards: options.numberOfRenderedCards,
  })

  useImperativeHandle(
    ref,
    () => ({
      swipe: (direction) => {
        refMap.get(currentIndex)?.swipe(direction)
      },
      unswipe: () => {
        if (currentIndex === 0) {
          return
        }
        setCurrentIndex((index) => index - 1)
        refMap.get(currentIndex - 1)?.unswipe()
        popSwipedCard()
      },
    }),
    [refMap, currentIndex, popSwipedCard],
  )

  return (
    <View style={styles.container}>
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
              renderCard({ data: cardData, ...renderCardAddedProps })
            }
            index={index}
            status={getStatus({ index, currentIndex })}
            cardWrapperStyle={cardWrapperStyle}
            onCardSwipeStatusUpdated={(swipeStatus) => {
              if (swipeStatus.phase === 'ended') {
                setCurrentIndex((index) => index + 1)
                pushSwipedCard(swipeStatus.direction)
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
            initialSwipeDirection={getSwipedCardSwipeDirection(index)}
            key={index}
          />
        )
      })}
    </View>
  )
})

export const SwipeableCardStack = memo(
  SwipeableCardStackMemo,
) as typeof SwipeableCardStackMemo

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
