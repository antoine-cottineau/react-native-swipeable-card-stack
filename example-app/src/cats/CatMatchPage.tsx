import styled, { css } from '@emotion/native'
import { useRoute, type RouteProp } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { FadeInDown } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { type RootStackParamList } from '../shared/components/Navigator'
import { Page } from '../shared/components/Page'
import { getAnimatedBrandedText } from '../shared/fonts/getBrandedText'
import { CatMatchProfileAvatar } from './CatMatchProfileAvatar'
import { CatTalkWithButton } from './CatTalkWithButton'
import { cats } from './cats'

export type MatchPageParams = {
  catName: string
}

export const CatMatchPage = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'CatMatch'>>()
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
      <CatMatchProfileAvatar imageUrl={cat.imageUrl} />
      <Label entering={FadeInDown.delay(300)}>It&apos;s a match!</Label>
      <ButtonWrapper style={css({ bottom: bottom + 16 })}>
        <CatTalkWithButton catName={cat.name} />
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

const Label = getAnimatedBrandedText({
  color: 'white',
  fontSize: 34,
  fontFamily: 'pacifico',
})
