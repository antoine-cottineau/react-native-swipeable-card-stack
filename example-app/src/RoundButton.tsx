import styled from '@emotion/native'

const SIZE = 80

export const RoundButton = () => {
  return <Container></Container>
}

const Container = styled.TouchableOpacity({
  width: SIZE,
  aspectRatio: 1,
  backgroundColor: 'white',
  borderRadius: SIZE / 2,
})
