import styled from '@emotion/native'
import { Image } from 'expo-image'
import { colors } from '../shared/colors'
import { type PokemonDataItem } from './PokemonDataItem'

type Props = PokemonDataItem

export const PokemonCard = ({ imageUrl }: Props) => (
  <TouchableContainer>
    <CardContainer>
      <FullScreenImage source={{ uri: imageUrl }} />
    </CardContainer>
  </TouchableContainer>
)

const TouchableContainer = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
})

const CardContainer = styled.View({
  width: 160,
  aspectRatio: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 16,
  backgroundColor: colors.secondaryFaded,
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 8,
})

const FullScreenImage = styled(Image)({
  width: '80%',
  height: '80%',
})
