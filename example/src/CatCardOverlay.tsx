import { memo } from 'react';
import { StyleSheet } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
  xAnimatedPosition: SharedValue<number>;
  yAnimatedPosition: SharedValue<number>;
};

const UnmemoizedCatCardOverlay = ({
  xAnimatedPosition,
  yAnimatedPosition,
}: Props) => {
  const style = useAnimatedStyle(() => {
    if (
      Math.abs(xAnimatedPosition.value) >= Math.abs(yAnimatedPosition.value)
    ) {
      return {
        backgroundColor: interpolateColor(
          xAnimatedPosition.value,
          [-1, 0, 1],
          ['red', 'transparent', 'green']
        ),
      };
    }
    return {
      backgroundColor: interpolateColor(
        yAnimatedPosition.value,
        [-1, 0, 1],
        ['purple', 'transparent', 'blue']
      ),
    };
  });

  return <Animated.View style={[styles.container, style]} />;
};

export const CatCardOverlay = memo(UnmemoizedCatCardOverlay);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
