import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SwipeableCardStack } from 'react-native-swipeable-card-stack'
import { CatCard } from './CatCard'
import { StackBottomOverlay } from './StackBottomOverlay'
import { cats } from './cats'

export const App = () => (
  <SafeAreaProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SwipeableCardStack data={cats} renderCard={CatCard} />
      <StackBottomOverlay />
    </GestureHandlerRootView>
  </SafeAreaProvider>
)
