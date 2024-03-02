import styled, { css } from '@emotion/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { RoundButton } from './RoundButton'

export const StackBottomOverlay = () => {
  const { bottom } = useSafeAreaInsets()

  return (
    <Container style={css({ bottom })}>
      <RoundButton />
      <RoundButton />
      <RoundButton />
    </Container>
  )
}

const Container = styled.View({
  position: 'absolute',
  left: 0,
  right: 0,
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  paddingBottom: 32,
})
