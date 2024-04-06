import styled, { css } from '@emotion/native'
import { colors } from '../shared/colors'
import { getBrandedText } from '../shared/fonts/getBrandedText'
import { FireIcon } from '../shared/icons/FireIcon'
import { FlyingIcon } from '../shared/icons/FlyingIcon'
import { GrassIcon } from '../shared/icons/GrassIcon'
import { type IconType } from '../shared/icons/Icon'
import { WaterIcon } from '../shared/icons/WaterIcon'
import { type PokemonElement } from './PokemonElement'

type Props = {
  element: PokemonElement
}

type ElementInformation = {
  name: string
  color: string
  Icon: IconType
}

export const PokemonElementView = ({ element }: Props) => {
  const { name, color, Icon } = elementMapping[element]

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

const elementMapping: Record<PokemonElement, ElementInformation> = {
  fire: {
    name: 'Fire',
    color: colors.fire,
    Icon: FireIcon,
  },
  water: {
    name: 'Water',
    color: colors.water,
    Icon: WaterIcon,
  },
  grass: {
    name: 'Grass',
    color: colors.grass,
    Icon: GrassIcon,
  },
  flying: {
    name: 'Flying',
    color: colors.flying,
    Icon: FlyingIcon,
  },
}
