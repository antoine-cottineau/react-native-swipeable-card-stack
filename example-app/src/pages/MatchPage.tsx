import styled from '@emotion/native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../Navigator'
import { cats } from '../modules/cat/cats'
import { MatchProfileAvatar } from '../modules/match/MatchProfileAvatar'

export type MatchPageParams = {
  catName: string
}

export const MatchPage = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Match'>>()
  const cat = cats.find((_) => _.name === params.catName)

  if (cat === undefined) {
    throw new Error(`Can't find a cat with name ${params.catName}.`)
  }

  return (
    <Container>
      <MatchProfileAvatar imageUrl={cat.imageUrl} />
    </Container>
  )
}

const Container = styled.View({
  flex: 1,
  backgroundColor: '#651FFF',
  justifyContent: 'center',
  alignItems: 'center',
})
