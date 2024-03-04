import styled from '@emotion/native'
import { TextStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { SupportedFontFamily } from './SupportedFontFamily'

type Props = Omit<TextStyle, 'fontFamily' | 'fontWeight'> & {
  fontFamily: SupportedFontFamily
}

export const getBrandedText = (props: Props) => styled.Text(props)

export const getAnimatedBrandedText = (props: Props) =>
  styled(Animated.Text)(props)
