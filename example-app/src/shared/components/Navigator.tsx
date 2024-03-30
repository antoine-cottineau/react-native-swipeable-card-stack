import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { MatchPage, type MatchPageParams } from '../../cats/MatchPage'
import { SwipePage } from '../../cats/SwipePage'
import { HomePage } from './HomePage'

export type RootStackParamList = {
  Home: undefined
  Swipe: undefined
  Match: MatchPageParams
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

export const Navigator = () => (
  <NavigationContainer>
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Home" component={HomePage} />
      <RootStack.Screen name="Swipe" component={SwipePage} />
      <RootStack.Screen
        name="Match"
        component={MatchPage}
        options={{ presentation: 'fullScreenModal' }}
      />
    </RootStack.Navigator>
  </NavigationContainer>
)
