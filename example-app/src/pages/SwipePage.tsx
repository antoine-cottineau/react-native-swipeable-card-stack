import styled from '@emotion/native'
import { type NavigationProp, useNavigation } from '@react-navigation/native'
import { ImpactFeedbackStyle, impactAsync } from 'expo-haptics'
import { useRef } from 'react'
import { SwipeableCardStack } from 'react-native-swipeable-card-stack'
import { type SwipeableCardRef } from 'react-native-swipeable-card-stack/dist/SwipeableCardStack'
import { type RootStackParamList } from '../Navigator'
import { Page } from '../Page'
import { CatCard } from '../modules/cat/CatCard'
import { EndOfStackView } from '../modules/cat/EndOfStackView'
import { cats } from '../modules/cat/cats'

export const SwipePage = () => {
  const ref = useRef<SwipeableCardRef>(null)
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()

  return (
    <Page>
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
              }
              if (action === 'swipe-right') {
                ref.current?.swipeRight()
              }
              if (action === 'undo') {
                ref.current?.unswipe()
              }
            }}
          />
        )}
        ref={ref}
        onActiveCardUpdate={({ phase, direction, currentDataItem }) => {
          if (phase === 'below-threshold' || phase === 'above-threshold') {
            impactAsync(ImpactFeedbackStyle.Light).catch(console.error)
          }
          if (
            phase === 'validated' &&
            direction === 'right' &&
            currentDataItem.hasLikedMyProfile
          ) {
            navigate('Match', { catName: currentDataItem.name })
          }
        }}
      />
    </Page>
  )
}

const EndOfStackContainer = styled.View({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
})
