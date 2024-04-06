import styled from '@emotion/native'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { colors } from '../shared/colors'
import { RoundButton } from '../shared/components/RoundButton'
import { getBrandedText } from '../shared/fonts/getBrandedText'
import { CloseIcon } from '../shared/icons/CloseIcon'
import { HeartIcon } from '../shared/icons/HeartIcon'
import { UndoIcon } from '../shared/icons/UndoIcon'
import { type CatAction } from './CatAction'

type Props = {
  name: string
  age: number
  onAction: (action: CatAction) => void
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
            color={colors.swipeLeft}
            size="large"
          />
          <RoundButton
            Icon={UndoIcon}
            onPress={() => {
              onAction('undo')
            }}
            color={colors.unswipe}
            size="small"
          />
          <RoundButton
            Icon={HeartIcon}
            onPress={() => {
              onAction('swipe-right')
            }}
            color={colors.swipeRight}
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

const Label = getBrandedText({
  fontSize: 40,
  fontFamily: 'roboto-bold',
  color: 'white',
})
