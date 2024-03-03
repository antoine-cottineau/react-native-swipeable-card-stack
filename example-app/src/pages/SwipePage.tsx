import styled from '@emotion/native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { ImpactFeedbackStyle, impactAsync } from 'expo-haptics'
import { useRef } from 'react'
import { SwipeableCardStack } from 'react-native-swipeable-card-stack'
import { SwipeableCardRef } from 'react-native-swipeable-card-stack/dist/SwipeableCardStack'
import { RootStackParamList } from '../Navigator'
import { CatCard } from '../modules/cat/CatCard'
import { EndOfStackView } from '../modules/cat/EndOfStackView'
import { cats } from '../modules/cat/cats'

export const SwipePage = () => {
  const ref = useRef<SwipeableCardRef>(null)
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()

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
        onActiveCardUpdate={({ phase, currentDataItem }) => {
          if (phase === 'below-threshold' || phase === 'above-threshold') {
            impactAsync(ImpactFeedbackStyle.Light).catch(console.error)
          }
          if (phase === 'validated') {
            navigate('Match', { catName: currentDataItem.name })
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
