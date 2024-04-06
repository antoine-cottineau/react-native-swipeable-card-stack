import styled from '@emotion/native'
import { TouchableOpacity } from 'react-native'
import { colors } from '../colors'
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
    <Column>
      <Title>{title}</Title>
      <SubTitleWrapper>
        <SubTitle>{subTitle}</SubTitle>
      </SubTitleWrapper>
    </Column>
  </Container>
)

const Container = styled(TouchableOpacity)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  padding: 16,
  borderRadius: 16,
  borderColor: 'gray',
  backgroundColor: colors.secondaryFaded,
  gap: 12,
  shadowColor: colors.secondaryFaded,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 8,
}))

const Column = styled.View({
  flex: 1,
})

const Title = getBrandedText({
  fontFamily: 'pacifico',
  fontSize: 24,
})

const SubTitleWrapper = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
})

const SubTitle = getBrandedText({
  flex: 1,
  fontFamily: 'roboto-medium',
  color: '#333',
  fontSize: 16,
})
