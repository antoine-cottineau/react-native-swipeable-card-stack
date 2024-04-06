import styled, { css } from '@emotion/native'
import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { colors } from '../shared/colors'
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
          backgroundColor: colors.primary,
          padding: 16,
          alignSelf: 'stretch',
          alignItems: 'center',
          borderRadius: 16,
          shadowColor: colors.primary,
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
