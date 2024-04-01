/* eslint-disable @typescript-eslint/no-non-null-assertion */
import styled, { css } from '@emotion/native'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { GoToHomeButton } from '../shared/components/GoToHomeButton'
import { Page } from '../shared/components/Page'
import { PokemonCard } from './PokemonCard'
import { pokemon } from './pokemon'

export const PokemonSwipePage = () => {
  const { top } = useSafeAreaInsets()

  return (
    <Page>
      <StatusBar style="light" />
      <GoToHomeButtonContainer style={css({ top: top + 16 })}>
        <GoToHomeButton />
      </GoToHomeButtonContainer>
      <PokemonCard {...pokemon[0]!} />
    </Page>
  )
}

const GoToHomeButtonContainer = styled.View({
  position: 'absolute',
  left: 16,
})
