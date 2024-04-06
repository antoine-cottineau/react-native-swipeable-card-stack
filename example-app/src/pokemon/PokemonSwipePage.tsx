import styled, { css } from '@emotion/native'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SwipeableCardStack } from 'react-native-swipeable-card-stack'
import { colors } from '../shared/colors'
import { GoToHomeButton } from '../shared/components/GoToHomeButton'
import { Page } from '../shared/components/Page'
import { PokemonCard } from './PokemonCard'
import { PokemonSwipePageBackground } from './PokemonSwipePageBackground'
import { pokemon } from './pokemon'

export const PokemonSwipePage = () => {
  const { top } = useSafeAreaInsets()

  return (
    <StyledPage>
      <StatusBar style="dark" />
      <PokemonSwipePageBackground score={8} />
      <SwipeableCardStack data={pokemon} renderCard={PokemonCard} />
      <GoToHomeButtonContainer style={css({ top: top + 16 })}>
        <GoToHomeButton />
      </GoToHomeButtonContainer>
    </StyledPage>
  )
}

const StyledPage = styled(Page)({
  backgroundColor: colors.secondaryFaded,
})

const GoToHomeButtonContainer = styled.View({
  position: 'absolute',
  left: 16,
})
