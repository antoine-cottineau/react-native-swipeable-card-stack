import styled from '@emotion/native'
import { colors } from '../shared/colors'
import { PokemonControl } from './PokemonControl'
import { type PokemonElement } from './PokemonElement'

type Props = {
  onPress: (element: PokemonElement) => void
}

export const PokemonControls = ({ onPress }: Props) => (
  <Container>
    <PokemonControl
      element="grass"
      onPress={() => {
        onPress('grass')
      }}
    />
    <MiddleRow>
      <PokemonControl
        element="fire"
        onPress={() => {
          onPress('fire')
        }}
      />
      <PokemonControl
        element="water"
        onPress={() => {
          onPress('water')
        }}
      />
    </MiddleRow>
    <PokemonControl
      element="flying"
      onPress={() => {
        onPress('flying')
      }}
    />
  </Container>
)

const Container = styled.View({
  alignItems: 'center',
  gap: 4,
  padding: 8,
  borderRadius: 16,
  backgroundColor: colors.secondaryFaded,
  shadowColor: colors.secondary,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 8,
})

const MiddleRow = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
})
