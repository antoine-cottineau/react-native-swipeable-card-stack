import styled, { css } from '@emotion/native'
import { StatusBar } from 'expo-status-bar'
import { useRef, useState } from 'react'
import {
  SafeAreaView,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import {
  type SwipeableCardRef,
  SwipeableCardStack,
  type SwipeDirection,
} from 'react-native-swipeable-card-stack'
import { colors } from '../shared/colors'
import { GoToHomeButton } from '../shared/components/GoToHomeButton'
import { Page } from '../shared/components/Page'
import { RoundButton } from '../shared/components/RoundButton'
import { UndoIcon } from '../shared/icons/UndoIcon'
import { PokemonCard } from './PokemonCard'
import { PokemonControls } from './PokemonControls'
import { type PokemonElement } from './PokemonElement'
import { PokemonSwipePageBackground } from './PokemonSwipePageBackground'
import { pokemon } from './pokemon'

export const PokemonSwipePage = () => {
  const { top } = useSafeAreaInsets()
  const { width, height } = useSafeAreaFrame()
  const ref = useRef<SwipeableCardRef>(null)
  const [score, setScore] = useState(0)
  const [numberOfSwipes, setNumberOfSwipes] = useState(0)

  return (
    <StyledPage>
      <StatusBar style="dark" />
      <PokemonSwipePageBackground
        score={score}
        numberOfSwipes={numberOfSwipes}
      />
      <SwipeableCardStack
        data={pokemon}
        renderCard={PokemonCard}
        cardWrapperStyle={{ justifyContent: 'center', alignItems: 'center' }}
        validateSwipeTranslationThreshold={{
          x: 0.3 * width,
          y: 0.25 * height,
        }}
        ref={ref}
        onActiveCardUpdate={({ phase, direction, currentDataItem }) => {
          if (phase !== 'validated') {
            return
          }
          const mapping: Record<SwipeDirection, PokemonElement> = {
            left: 'fire',
            right: 'water',
            top: 'grass',
            bottom: 'flying',
          }
          if (mapping[direction] === currentDataItem.element) {
            setScore((_) => _ + 1)
          }
          setNumberOfSwipes((_) => _ + 1)
        }}
      />
      <GoToHomeButtonContainer style={css({ top: top + 16 })}>
        <GoToHomeButton />
      </GoToHomeButtonContainer>
      <UnswipeButtonContainer>
        <RoundButton
          Icon={UndoIcon}
          onPress={() => {
            ref.current?.unswipe()
          }}
          color={'black'}
          size={56}
        />
      </UnswipeButtonContainer>
      <PokemonControlsContainer>
        <PokemonControls
          onPress={(element) => {
            const mapping: Record<PokemonElement, SwipeDirection> = {
              fire: 'left',
              water: 'right',
              grass: 'top',
              flying: 'bottom',
            }
            ref.current?.swipe(mapping[element])
          }}
        />
      </PokemonControlsContainer>
    </StyledPage>
  )
}

const StyledPage = styled(Page)({
  backgroundColor: colors.secondaryFaded,
})

const GoToHomeButtonContainer = styled.View({
  position: 'absolute',
  left: 16,
})

const PokemonControlsContainer = styled(SafeAreaView)({
  position: 'absolute',
  bottom: 0,
  right: 0,
  padding: 16,
})

const UnswipeButtonContainer = styled(SafeAreaView)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  padding: 16,
})
