import styled from '@emotion/native'
import { Image } from 'expo-image'
import { type RenderCardProps } from 'react-native-swipeable-card-stack'
import { colors } from '../shared/colors'
import { type PokemonDataItem } from './PokemonDataItem'

type Props = RenderCardProps<PokemonDataItem>

export const PokemonCard = ({ data }: Props) => (
  <CardContainer>
    <FullScreenImage source={{ uri: data.imageUrl }} />
  </CardContainer>
)

const CardContainer = styled.View({
  width: 160,
  aspectRatio: 1,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 16,
  backgroundColor: colors.secondaryFaded,
  shadowColor: colors.secondary,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 8,
})

const FullScreenImage = styled(Image)({
  width: '80%',
  height: '80%',
})
