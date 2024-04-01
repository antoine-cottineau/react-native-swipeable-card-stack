import styled from '@emotion/native'
import { useNavigation, type NavigationProp } from '@react-navigation/native'
import { HomeIcon } from '../icons/HomeIcon'
import { type RootStackParamList } from './Navigator'

const size = 56

export const GoToHomeButton = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()

  return (
    <Container
      onPress={() => {
        navigate('Home')
      }}
    >
      <HomeIcon size={size / 2} color="black" />
    </Container>
  )
}

const Container = styled.TouchableOpacity({
  width: size,
  aspectRatio: 1,
  borderRadius: size / 2,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 8,
})
