import styled from '@emotion/native'
import { Image } from 'expo-image'
import sadCatImage from '../../images/sad-cat.webp'

export const EndOfStackView = () => (
  <Container>
    <FullScreenImage source={sadCatImage} contentFit="contain" />
    <Label>No more cats to match</Label>
    <Label>Come back later!</Label>
  </Container>
)

const Container = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
})

const FullScreenImage = styled(Image)({
  width: 200,
  aspectRatio: 1,
})

const Label = styled.Text({
  fontSize: 20,
  fontWeight: '700',
})
