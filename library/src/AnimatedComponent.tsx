import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export const AnimatedComponent = () => {
  const animation = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animation.value,
      [0, 1],
      ['yellow', 'green'],
    ),
  }))

  return (
    <TouchableOpacity
      onPress={() => {
        animation.value = withTiming(1)
      }}
      onLongPress={() => {
        animation.value = withTiming(0)
      }}
    >
      <Animated.View style={[styles.box, animatedStyle]}></Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 200,
    aspectRatio: 1,
  },
})
