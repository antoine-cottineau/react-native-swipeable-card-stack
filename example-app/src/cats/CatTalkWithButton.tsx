import styled, { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { getBrandedText } from '../shared/fonts/getBrandedText'

type Props = {
  catName: string
}

export const CatTalkWithButton = ({ catName }: Props) => {
  const { goBack } = useNavigation()

  return (
    <Container entering={FadeInDown.delay(300)}>
      <Pressable
        onPress={goBack}
        style={css({
          backgroundColor: '#651FFF',
          padding: 16,
          alignSelf: 'stretch',
          alignItems: 'center',
          borderRadius: 16,
          shadowColor: '#6A1B9A',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 8,
        })}
      >
        <Label>{`Have a chat with ${catName} →`}</Label>
      </Pressable>
    </Container>
  )
}

const Container = styled(Animated.View)({})

const Label = getBrandedText({
  color: 'white',
  fontFamily: 'roboto-medium',
  fontSize: 20,
})
