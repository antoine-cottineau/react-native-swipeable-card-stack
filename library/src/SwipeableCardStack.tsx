import styled, { css } from '@emotion/native'
import {
  forwardRef,
  useImperativeHandle,
  useState,
  type ForwardedRef,
  type ReactNode,
} from 'react'
import { type StyleProp, type ViewStyle } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { type RenderCardProps } from './RenderCardProps'
import { type SwipeStatus } from './SwipeStatus'
import {
  swipeableCardStackDefaultOptions,
  type SwipeableCardStackOptions,
} from './SwipeableCardStackOptions'
import { SwipeableCardWrapper } from './SwipeableCardWrapper'
import { useRefMap } from './useRefMap'

export type SwipeableCardStackProps<T> = {
  data: T[]
  renderCard: (params: RenderCardProps<T>) => ReactNode
  cardWrapperStyle?: StyleProp<ViewStyle>
  onActiveCardUpdate?: (swipeStatus: SwipeStatus) => void
  options?: Partial<SwipeableCardStackOptions>
}

export type SwipeableCardRef = {
  swipeLeft: () => void
  swipeRight: () => void
}

const numberOfRenderedCards = 3

export const SwipeableCardStack = forwardRef(
  <T,>(
    {
      data,
      renderCard,
      cardWrapperStyle,
      onActiveCardUpdate,
      options: userOptions,
    }: SwipeableCardStackProps<T>,
    ref: ForwardedRef<SwipeableCardRef>,
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const refMap = useRefMap<number, SwipeableCardRef>()
    const animationPosition = useSharedValue(0)

    const options: SwipeableCardStackOptions = {
      ...userOptions,
      ...swipeableCardStackDefaultOptions,
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
      [currentIndex],
    )

    return (
      <Container>
        {data.map((cardData, index) => {
          const hasCardBeenSwiped = index < currentIndex
          const shouldNotRenderCardYet =
            index > currentIndex + numberOfRenderedCards - 1
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
              animationPosition={animationPosition}
              currentIndex={currentIndex}
              cardWrapperStyle={[
                cardWrapperStyle,
                css({ zIndex: data.length - index - 1 }),
              ]}
              onCardSwipeStatusUpdated={(swipeStatus) => {
                if (swipeStatus.phase === 'ended') {
                  setCurrentIndex((index) => index + 1)
                  animationPosition.value = 0
                }
                if (index === currentIndex) {
                  onActiveCardUpdate?.(swipeStatus)
                }
              }}
              options={options}
              key={index}
            />
          )
        })}
      </Container>
    )
  },
)

const Container = styled.View({
  flex: 1,
})
