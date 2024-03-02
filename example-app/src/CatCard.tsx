import styled from '@emotion/native'
import { RenderCardProps } from 'react-native-swipeable-card-stack'
import { Action } from './Action'
import { CatCardBottomView } from './CatCardBottomView'
import { CatDataItem } from './CatDataItem'

type Props = RenderCardProps<CatDataItem> & {
  onAction: (action: Action) => void
}

export const CatCard = ({ name, age, imageUrl, onAction }: Props) => (
  <Container>
    <FullScreenImage source={{ uri: imageUrl }} />
    <CatCardBottomView name={name} age={age} onAction={onAction} />
  </Container>
)

const Container = styled.View({
  flex: 1,
})

const FullScreenImage = styled.Image({
  width: '100%',
  height: '100%',
})
