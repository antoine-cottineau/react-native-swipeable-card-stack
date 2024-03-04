import { useFonts, type FontSource } from 'expo-font'
import { SupportedFontFamily } from './SupportedFontFamily'

const fontPathMapping: Record<SupportedFontFamily, FontSource> = {
  pacifico: require('./fonts/Pacifico-Regular.ttf'),
  'roboto-bold': require('./fonts/Roboto-Bold.ttf'),
  'roboto-medium': require('./fonts/Roboto-Medium.ttf'),
}

export const useLoadFonts = () => ({
  areFontsLoaded: useFonts(fontPathMapping)[0],
})
