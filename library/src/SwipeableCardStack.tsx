import styled from '@emotion/native'
import {
  forwardRef,
  useImperativeHandle,
  useState,
  type ForwardedRef,
  type ReactNode,
} from 'react'
import { type StyleProp, type ViewStyle } from 'react-native'
import { runOnJS, useSharedValue, withTiming } from 'react-native-reanimated'
import { type RenderCardProps } from './RenderCardProps'
import { type SwipeUpdate } from './SwipeUpdate'
import { type SwipeableCardStackOptions } from './SwipeableCardStackOptions'
import { SwipeableCardWrapper } from './SwipeableCardWrapper'
import { toReversed } from './toReversed'
import { useDefaultOptions } from './useDefaultOptions'
import { type SwipeDirection } from '.'

export type SwipeableCardStackProps<T> = {
  /**
   * An array of data items that will be passed to `renderCard`.
   */
  data: T[]

  /**
   * A function that render a card based on the provided data and helpful information (see [RenderCardProps](https://github.com/antoine-cottineau/react-native-swipeable-card-stack/blob/main/library/src/RenderCardProps.ts)).
   */
  renderCard: (params: RenderCardProps<T>) => ReactNode

  /**
   * An optional `ViewStyle` that will be applied to the wrapper component of every card.
   */
  cardWrapperStyle?: StyleProp<ViewStyle>

  /**
   * An optional function that will be triggered everytime a swipe update occurs.
   *
   * This is where you should listen for important updates such as a validated swipe.
   */
  onActiveCardUpdate?: (swipeUpdate: SwipeUpdate<T>) => void
} & Partial<SwipeableCardStackOptions>

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
  const animationPosition = useSharedValue(0)
  const defaultOptions = useDefaultOptions()

  const options: SwipeableCardStackOptions = {
    ...userOptions,
    ...defaultOptions,
  }

  const incrementCurrentIndex = () => {
    setCurrentIndex((index) => index + 1)
    animationPosition.value = 0
  }

  const onCardImperativelySwipped = (direction: SwipeDirection) => {
    const currentDataItem = data[currentIndex]
    if (onActiveCardUpdate === undefined || currentDataItem === undefined) {
      return
    }
    onActiveCardUpdate({
      direction,
      phase: 'validated',
      currentIndex,
      currentDataItem,
    })
    onActiveCardUpdate({
      direction,
      phase: 'ended',
      currentIndex,
      currentDataItem,
    })
    incrementCurrentIndex()
  }

  useImperativeHandle(ref, () => ({
    swipeLeft: () => {
      animationPosition.value = withTiming(
        -1,
        options.imperativeSwipeAnimationConfig,
        () => {
          runOnJS(onCardImperativelySwipped)('left')
        },
      )
    },
    swipeRight: () => {
      animationPosition.value = withTiming(
        1,
        options.imperativeSwipeAnimationConfig,
        () => {
          runOnJS(onCardImperativelySwipped)('right')
        },
      )
    },
  }))

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
            renderCard={(renderCardAddedProps) =>
              renderCard({ ...cardData, ...renderCardAddedProps })
            }
            index={index}
            animationPosition={animationPosition}
            currentIndex={currentIndex}
            cardWrapperStyle={cardWrapperStyle}
            onCardSwipeStatusUpdated={(swipeStatus) => {
              if (swipeStatus.phase === 'ended') {
                incrementCurrentIndex()
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
