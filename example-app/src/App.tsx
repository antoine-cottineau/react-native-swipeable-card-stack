import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SwipeableCardStack } from 'react-native-swipeable-card-stack'
import { CatCard } from './CatCard'
import { cats } from './cats'

export const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <SwipeableCardStack data={cats} renderCard={CatCard} />
  </GestureHandlerRootView>
)
