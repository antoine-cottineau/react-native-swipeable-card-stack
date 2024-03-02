import styled from '@emotion/native'
import { RenderCardProps } from 'react-native-swipeable-card-stack'
import { CatCardBottomView } from './CatCardBottomView'
import { CatDataItem } from './CatDataItem'

export const CatCard = ({
  name,
  age,
  imageUrl,
}: RenderCardProps<CatDataItem>) => (
  <Container>
    <FullScreenImage source={{ uri: imageUrl }} />
    <CatCardBottomView name={name} age={age} />
  </Container>
)

const Container = styled.View({
  flex: 1,
})

const FullScreenImage = styled.Image({
  width: '100%',
  height: '100%',
})
