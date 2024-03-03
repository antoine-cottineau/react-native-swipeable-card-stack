import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SwipePage } from './pages/SwipePage'

export const App = () => (
  <SafeAreaProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <SwipePage />
    </GestureHandlerRootView>
  </SafeAreaProvider>
)
