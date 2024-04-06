import styled, { css } from '@emotion/native'
import { StatusBar } from 'expo-status-bar'
import { useRef } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  type SwipeableCardRef,
  SwipeableCardStack,
  type SwipeDirection,
} from 'react-native-swipeable-card-stack'
import { colors } from '../shared/colors'
import { GoToHomeButton } from '../shared/components/GoToHomeButton'
import { Page } from '../shared/components/Page'
import { PokemonCard } from './PokemonCard'
import { PokemonControls } from './PokemonControls'
import { type PokemonElement } from './PokemonElement'
import { PokemonSwipePageBackground } from './PokemonSwipePageBackground'
import { pokemon } from './pokemon'

export const PokemonSwipePage = () => {
  const { top } = useSafeAreaInsets()
  const ref = useRef<SwipeableCardRef>(null)

  return (
    <StyledPage>
      <StatusBar style="dark" />
      <PokemonSwipePageBackground score={8} />
      <SwipeableCardStack
        data={pokemon}
        renderCard={PokemonCard}
        cardWrapperStyle={{ justifyContent: 'center', alignItems: 'center' }}
        ref={ref}
      />
      <GoToHomeButtonContainer style={css({ top: top + 16 })}>
        <GoToHomeButton />
      </GoToHomeButtonContainer>
      <PokemonControlsContainer>
        <PokemonControls
          onPress={(element) => {
            const mapping: Record<PokemonElement, SwipeDirection> = {
              fire: 'left',
              water: 'right',
              grass: 'top',
              flying: 'bottom',
            }
            ref.current?.swipe(mapping[element])
          }}
        />
      </PokemonControlsContainer>
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

const PokemonControlsContainer = styled(SafeAreaView)({
  position: 'absolute',
  bottom: 0,
  right: 0,
  padding: 16,
})
