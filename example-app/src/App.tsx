import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Navigator } from './Navigator'
import { useLoadFonts } from './libs/fonts/useLoadFonts'

preventAutoHideAsync()

export const App = () => {
  const { areFontsLoaded } = useLoadFonts()

  if (!areFontsLoaded) {
    return null
  }

  hideAsync()

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <Navigator />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
