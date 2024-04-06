import { css } from '@emotion/native'
import { Pressable } from 'react-native'
import { colors } from '../shared/colors'
import {
  pokemonElementInformationMapping,
  type PokemonElement,
} from './PokemonElement'

const size = 48

type Props = {
  element: PokemonElement
  onPress: () => void
}

export const PokemonControl = ({ element, onPress }: Props) => {
  const { color, Icon } = pokemonElementInformationMapping[element]

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        css({
          justifyContent: 'center',
          alignItems: 'center',
          width: size,
          borderRadius: size / 2,
          aspectRatio: 1,
          borderWidth: 1.5,
          backgroundColor: pressed ? color : colors.secondaryFaded,
          borderColor: color,
        })
      }
    >
      {({ pressed }) => <Icon size={24} color={pressed ? 'white' : color} />}
    </Pressable>
  )
}
