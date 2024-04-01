import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { CatMatchPage, type MatchPageParams } from '../../cats/CatMatchPage'
import { CatSwipePage } from '../../cats/CatSwipePage'
import { PokemonSwipePage } from '../../pokemon/PokemonSwipePage'
import { HomePage } from './HomePage'

export type RootStackParamList = {
  Home: undefined
  CatSwipe: undefined
  CatMatch: MatchPageParams
  PokemonSwipe: undefined
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
      <RootStack.Screen name="CatSwipe" component={CatSwipePage} />
      <RootStack.Screen
        name="CatMatch"
        component={CatMatchPage}
        options={{ presentation: 'fullScreenModal' }}
      />
      <RootStack.Screen name="PokemonSwipe" component={PokemonSwipePage} />
    </RootStack.Navigator>
  </NavigationContainer>
)
