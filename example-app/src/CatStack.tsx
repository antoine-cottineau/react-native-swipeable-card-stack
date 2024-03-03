import styled from '@emotion/native'
import { useRef } from 'react'
import { SwipeableCardStack } from 'react-native-swipeable-card-stack'
import { SwipeableCardRef } from 'react-native-swipeable-card-stack/dist/SwipeableCardStack'
import { CatCard } from './CatCard'
import { EndOfStackView } from './EndOfStackView'
import { cats } from './cats'

export const CatStack = () => {
  const ref = useRef<SwipeableCardRef>(null)

  return (
    <>
      <EndOfStackContainer>
        <EndOfStackView />
      </EndOfStackContainer>
      <SwipeableCardStack
        data={cats}
        renderCard={(props) => (
          <CatCard
            {...props}
            onAction={(action) => {
              if (action === 'swipe-left') {
                ref.current?.swipeLeft()
                return
              }
              if (action === 'swipe-right') {
                ref.current?.swipeRight()
              }
            }}
          />
        )}
        ref={ref}
      />
    </>
  )
}

const EndOfStackContainer = styled.View({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
})
