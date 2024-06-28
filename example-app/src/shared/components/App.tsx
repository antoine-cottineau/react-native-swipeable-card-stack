import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useLoadFonts } from '../fonts/useLoadFonts'
import { Navigator } from './Navigator'

preventAutoHideAsync().catch((error: unknown) => {
  console.error(error)
})

export const App = () => {
  const { areFontsLoaded } = useLoadFonts()

  if (!areFontsLoaded) {
    return null
  }

  hideAsync().catch((error: unknown) => {
    console.error(error)
  })

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigator />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
