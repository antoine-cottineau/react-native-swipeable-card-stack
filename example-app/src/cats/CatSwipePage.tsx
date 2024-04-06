import styled, { css } from '@emotion/native'
import { type NavigationProp, useNavigation } from '@react-navigation/native'
import { ImpactFeedbackStyle, impactAsync } from 'expo-haptics'
import { StatusBar } from 'expo-status-bar'
import { useRef } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  type SwipeableCardRef,
  SwipeableCardStack,
} from 'react-native-swipeable-card-stack'
import { GoToHomeButton } from '../shared/components/GoToHomeButton'
import { type RootStackParamList } from '../shared/components/Navigator'
import { Page } from '../shared/components/Page'
import { CatCard } from './CatCard'
import { CatEndOfStackView } from './CatEndOfStackView'
import { cats } from './cats'

export const CatSwipePage = () => {
  const ref = useRef<SwipeableCardRef>(null)
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()
  const { top } = useSafeAreaInsets()

  return (
    <Page>
      <StatusBar style="light" />
      <EndOfStackContainer>
        <CatEndOfStackView />
      </EndOfStackContainer>
      <SwipeableCardStack
        data={cats}
        renderCard={(props) => (
          <CatCard
            {...props}
            onAction={(action) => {
              if (action === 'swipe-left') {
                ref.current?.swipe('left')
              }
              if (action === 'swipe-right') {
                ref.current?.swipe('right')
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
            navigate('CatMatch', { catName: currentDataItem.name })
          }
        }}
      />
      <GoToHomeButtonContainer style={css({ top: top + 16 })}>
        <GoToHomeButton />
      </GoToHomeButtonContainer>
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

const GoToHomeButtonContainer = styled.View({
  position: 'absolute',
  left: 16,
})