import styled from '@emotion/native'
import { TouchableOpacity, View } from 'react-native'
import { getBrandedText } from '../fonts/getBrandedText'
import { type IconType } from '../icons/Icon'

type Props = {
  title: string
  subTitle: string
  Icon: IconType
  onPress: () => void
}

export const HomeButton = ({ title, subTitle, Icon, onPress }: Props) => (
  <Container onPress={onPress}>
    <Icon size={32} color="black" />
    <View>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
    </View>
  </Container>
)

const Container = styled(TouchableOpacity)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  padding: 16,
  borderRadius: 16,
  borderColor: 'gray',
  backgroundColor: '#D1C4E9',
  gap: 12,
  shadowColor: '#D1C4E9',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 8,
}))

const Title = getBrandedText({
  fontFamily: 'pacifico',
  fontSize: 24,
})

const SubTitle = getBrandedText({
  fontFamily: 'roboto-medium',
  color: '#333',
  fontSize: 16,
})
