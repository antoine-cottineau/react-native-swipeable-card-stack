import styled from '@emotion/native'
import { LinearGradient } from 'expo-linear-gradient'

export const BackgroundGradient = () => (
  <Gradient colors={['#651FFF', '#BA68C8']}></Gradient>
)

const Gradient = styled(LinearGradient)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
})
