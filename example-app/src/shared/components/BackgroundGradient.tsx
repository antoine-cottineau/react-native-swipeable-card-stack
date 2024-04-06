import styled from '@emotion/native'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../colors'

export const BackgroundGradient = () => (
  <Gradient colors={[colors.primary, colors.secondary]} />
)

const Gradient = styled(LinearGradient)({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
})
