import { colors } from '../shared/colors'
import { FireIcon } from '../shared/icons/FireIcon'
import { FlyingIcon } from '../shared/icons/FlyingIcon'
import { GrassIcon } from '../shared/icons/GrassIcon'
import { type IconType } from '../shared/icons/Icon'
import { WaterIcon } from '../shared/icons/WaterIcon'

export type PokemonElement = 'fire' | 'water' | 'grass' | 'flying'

type PokemonElementInformation = {
  name: string
  color: string
  Icon: IconType
}

export const pokemonElementInformationMapping: Record<
  PokemonElement,
  PokemonElementInformation
> = {
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
