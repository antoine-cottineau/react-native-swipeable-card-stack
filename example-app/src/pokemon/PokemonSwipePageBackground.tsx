import styled from '@emotion/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getBrandedText } from '../shared/fonts/getBrandedText'
import { PokemonElementView } from './PokemonElementView'

type Props = {
  score: number
  numberOfSwipes: number
}

export const PokemonSwipePageBackground = ({
  score,
  numberOfSwipes,
}: Props) => (
  <Container>
    <ScoreContainer>
      <ScoreLabel>{`Score: ${score}/${numberOfSwipes}`}</ScoreLabel>
    </ScoreContainer>
    <PokemonElementView element="grass" />
    <MiddleRow>
      <PokemonElementView element="fire" />
      <PokemonElementView element="water" />
    </MiddleRow>
    <PokemonElementView element="flying" />
  </Container>
)

const Container = styled(SafeAreaView)({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
})

const MiddleRow = styled.View({
  alignSelf: 'stretch',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const ScoreContainer = styled(SafeAreaView)({
  position: 'absolute',
  top: 0,
  right: 0,
  padding: 16,
})

const ScoreLabel = getBrandedText({
  fontFamily: 'roboto-bold',
  fontSize: 16,
})
