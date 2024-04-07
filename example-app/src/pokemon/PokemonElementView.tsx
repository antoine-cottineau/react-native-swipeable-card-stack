import styled, { css } from '@emotion/native'
import { getBrandedText } from '../shared/fonts/getBrandedText'
import {
  pokemonElementInformationMapping,
  type PokemonElement,
} from './PokemonElement'

type Props = {
  element: PokemonElement
}

export const PokemonElementView = ({ element }: Props) => {
  const { name, color, Icon } = pokemonElementInformationMapping[element]

  return (
    <Container style={css({ backgroundColor: color })}>
      <Icon size={20} color={'white'} />
      <Label>{name}</Label>
    </Container>
  )
}

const Container = styled.View({
  width: 64,
  aspectRatio: 1,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 4,
  borderRadius: 16,
})

const Label = getBrandedText({
  color: 'white',
  fontFamily: 'roboto-medium',
  fontSize: 16,
})
