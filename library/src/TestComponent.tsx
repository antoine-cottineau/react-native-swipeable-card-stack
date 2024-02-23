import { ActivityIndicator, Button, View } from 'react-native'

export const TestComponent = () => {
  return (
    <View style={{ width: 5 }}>
      <Button title="Bonjour" />
      <ActivityIndicator />
    </View>
  )
}
