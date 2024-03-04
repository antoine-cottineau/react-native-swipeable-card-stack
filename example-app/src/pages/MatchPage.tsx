import styled, { css } from '@emotion/native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { RootStackParamList } from '../Navigator'
import { Page } from '../Page'
import { cats } from '../modules/cat/cats'
import { MatchProfileAvatar } from '../modules/match/MatchProfileAvatar'
import { TalkWithButton } from '../modules/match/TalkWithButton'

export type MatchPageParams = {
  catName: string
}

export const MatchPage = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Match'>>()
  const { bottom } = useSafeAreaInsets()
  const cat = cats.find((_) => _.name === params.catName)

  if (cat === undefined) {
    throw new Error(`Can't find a cat with name ${params.catName}.`)
  }

  return (
    <Container>
      <LinearGradient
        colors={['#651FFF', '#BA68C8']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      ></LinearGradient>
      <MatchProfileAvatar imageUrl={cat.imageUrl} />
      <Label entering={FadeInDown.delay(300)}>It's a match!</Label>
      <ButtonWrapper style={css({ bottom: bottom + 16 })}>
        <TalkWithButton catName={cat.name} />
      </ButtonWrapper>
    </Container>
  )
}

const Container = styled(Page)({
  justifyContent: 'center',
  alignItems: 'center',
  gap: 16,
})

const ButtonWrapper = styled.View({
  position: 'absolute',
  left: 16,
  right: 16,
})

const Label = styled(Animated.Text)({
  color: 'white',
  fontSize: 34,
  fontFamily: 'pacifico',
})
