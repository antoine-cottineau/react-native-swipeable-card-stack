import styled from '@emotion/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Text } from 'react-native'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { RoundButton } from './RoundButton'
import { CloseIcon } from './icons/CloseIcon'
import { HeartIcon } from './icons/HeartIcon'
import { UndoIcon } from './icons/UndoIcon'

type Props = {
  name: string
  age: number
}

export const CatCardBottomView = ({ name, age }: Props) => {
  const { height } = useSafeAreaFrame()
  return (
    <Container>
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: 96,
        }}
      ></LinearGradient>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: height / 2,
        }}
      ></LinearGradient>
      <ContentContainer>
        <Text
          style={{ fontSize: 32, fontWeight: '600', color: 'white' }}
        >{`${name} - ${age}`}</Text>
        <ButtonsContainer>
          <RoundButton Icon={CloseIcon} onPress={() => null} />
          <RoundButton Icon={UndoIcon} onPress={() => null} />
          <RoundButton Icon={HeartIcon} onPress={() => null} />
        </ButtonsContainer>
      </ContentContainer>
    </Container>
  )
}

const Container = styled.View({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  justifyContent: 'flex-end',
})

const ContentContainer = styled.View({
  padding: 32,
  gap: 16,
})

const ButtonsContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
})
