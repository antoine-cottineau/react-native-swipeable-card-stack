import styled from '@emotion/native'
import { Image } from 'expo-image'
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { type RenderCardProps } from 'react-native-swipeable-card-stack'
import { type Action } from './Action'
import { CatCardBottomView } from './CatCardBottomView'
import { type CatDataItem } from './CatDataItem'

type Props = RenderCardProps<CatDataItem> & {
  onAction: (action: Action) => void
}

export const CatCard = ({
  name,
  age,
  imageUrl,
  onAction,
  animationPosition,
  index,
  currentIndex,
}: Props) => {
  const containerStyle = useAnimatedStyle(() => {
    if (index !== currentIndex) {
      return {}
    }
    return {
      transform: [{ rotate: `${animationPosition.value * 10}deg` }],
      borderRadius: interpolate(
        Math.abs(animationPosition.value),
        [0, 0.2],
        [0, 16],
      ),
    }
  })

  const overlayStyle = useAnimatedStyle(() => {
    if (index !== currentIndex) {
      return {}
    }
    return {
      backgroundColor: interpolateColor(
        animationPosition.value,
        [-1, 0, 1],
        ['#F44336', 'transparent', '#43A047'],
      ),
      opacity: interpolate(
        Math.abs(animationPosition.value),
        [0, 0.3],
        [0, 0.8],
        Extrapolation.CLAMP,
      ),
    }
  })

  return (
    <Container style={containerStyle}>
      <FullScreenImage source={{ uri: imageUrl }} />
      <Overlay style={overlayStyle} />
      <CatCardBottomView name={name} age={age} onAction={onAction} />
    </Container>
  )
}

const Container = styled(Animated.View)({
  flex: 1,
  overflow: 'hidden',
})

const FullScreenImage = styled(Image)({
  width: '100%',
  height: '100%',
})

const Overlay = styled(Animated.View)({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
})
