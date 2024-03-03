import styled from '@emotion/native'
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { RenderCardProps } from 'react-native-swipeable-card-stack'
import { Action } from './Action'
import { CatCardBottomView } from './CatCardBottomView'
import { CatDataItem } from './CatDataItem'

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
  const animatedStyle = useAnimatedStyle(() => {
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

  return (
    <Container style={animatedStyle}>
      <FullScreenImage source={{ uri: imageUrl }} />
      <CatCardBottomView name={name} age={age} onAction={onAction} />
    </Container>
  )
}

const Container = styled(Animated.View)({
  flex: 1,
  overflow: 'hidden',
})

const FullScreenImage = styled.Image({
  width: '100%',
  height: '100%',
})
