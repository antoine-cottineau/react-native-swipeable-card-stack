import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet, Text, View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {
  AnimatedComponent,
  TestComponent,
} from 'react-native-swipeable-card-stack'

export const App = () => {
  const animation = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animation.value,
      [0, 1],
      ['white', 'green'],
    ),
  }))

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <StatusBar style="auto" />
      <Button
        title="Animate"
        onPress={() => {
          animation.value = withTiming(1)
        }}
      />
      <Button
        title="Reset"
        onPress={() => {
          animation.value = withTiming(0)
        }}
      />
      <TestComponent />
      <AnimatedComponent />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
