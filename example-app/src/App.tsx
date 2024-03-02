import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { CatStack } from './CatStack'

export const App = () => (
  <SafeAreaProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <CatStack />
    </GestureHandlerRootView>
  </SafeAreaProvider>
)
