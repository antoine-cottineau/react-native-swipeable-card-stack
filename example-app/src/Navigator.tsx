import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MatchPage, MatchPageParams } from './pages/MatchPage'
import { SwipePage } from './pages/SwipePage'

export type RootStackParamList = {
  Swipe: undefined
  Match: MatchPageParams
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

export const Navigator = () => (
  <NavigationContainer>
    <RootStack.Navigator
      initialRouteName="Swipe"
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Swipe" component={SwipePage} />
      <RootStack.Screen
        name="Match"
        component={MatchPage}
        options={{ presentation: 'fullScreenModal' }}
      />
    </RootStack.Navigator>
  </NavigationContainer>
)
