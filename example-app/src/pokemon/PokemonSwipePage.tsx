import styled, { css } from '@emotion/native'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SwipeableCardStack } from 'react-native-swipeable-card-stack'
import { GoToHomeButton } from '../shared/components/GoToHomeButton'
import { Page } from '../shared/components/Page'
import { PokemonCard } from './PokemonCard'
import { PokemonSwipePageBackground } from './PokemonSwipePageBackground'
import { pokemon } from './pokemon'

export const PokemonSwipePage = () => {
  const { top } = useSafeAreaInsets()

  return (
    <Page>
      <StatusBar style="light" />
      <PokemonSwipePageBackground />
      <SwipeableCardStack data={pokemon} renderCard={PokemonCard} />
      <GoToHomeButtonContainer style={css({ top: top + 16 })}>
        <GoToHomeButton />
      </GoToHomeButtonContainer>
    </Page>
  )
}

const GoToHomeButtonContainer = styled.View({
  position: 'absolute',
  left: 16,
})
