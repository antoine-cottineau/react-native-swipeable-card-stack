import styled from '@emotion/native'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import { useRef } from 'react'
import { SwipeableCardStack } from 'react-native-swipeable-card-stack'
import { SwipeableCardRef } from 'react-native-swipeable-card-stack/dist/SwipeableCardStack'
import { CatCard } from './CatCard'
import { cats } from './cats'
import { EndOfStackView } from './EndOfStackView'

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
        onActiveCardUpdate={({ phase }) => {
          if (phase === 'below-threshold' || phase === 'above-threshold') {
            impactAsync(ImpactFeedbackStyle.Light).catch(console.error)
          }
        }}
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
