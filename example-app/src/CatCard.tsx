import styled from '@emotion/native'
import { RenderCardProps } from 'react-native-swipeable-card-stack'
import { CatDataItem } from './CatDataItem'

export const CatCard = ({ imageUrl }: RenderCardProps<CatDataItem>) => (
  <Container>
    <FullScreenImage source={{ uri: imageUrl }} />
  </Container>
)

const Container = styled.View({
  flex: 1,
})

const FullScreenImage = styled.Image({
  width: '100%',
  height: '100%',
})
