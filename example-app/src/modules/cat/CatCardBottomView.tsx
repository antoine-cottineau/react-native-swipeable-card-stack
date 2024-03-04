import styled from '@emotion/native'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { RoundButton } from '../../RoundButton'
import { CloseIcon } from '../../icons/CloseIcon'
import { HeartIcon } from '../../icons/HeartIcon'
import { UndoIcon } from '../../icons/UndoIcon'
import { Action } from './Action'

type Props = {
  name: string
  age: number
  onAction: (action: Action) => void
}

export const CatCardBottomView = ({ name, age, onAction }: Props) => {
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
        <Label>{`${name} - ${age}`}</Label>
        <ButtonsContainer>
          <RoundButton
            Icon={CloseIcon}
            onPress={() => {
              onAction('swipe-left')
            }}
            color={'#F44336'}
            size="large"
          />
          <RoundButton
            Icon={UndoIcon}
            onPress={() => {
              onAction('undo')
            }}
            color={'#81D4FA'}
            size="small"
          />
          <RoundButton
            Icon={HeartIcon}
            onPress={() => {
              onAction('swipe-right')
            }}
            color={'#43A047'}
            size="large"
          />
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
  alignItems: 'center',
})

const Label = styled.Text({
  fontSize: 40,
  fontFamily: 'roboto-bold',
  color: 'white',
})
