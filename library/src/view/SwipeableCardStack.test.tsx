import { screen } from '@testing-library/react-native'
import { View, Text } from 'react-native'
import { type RenderCardProps } from '../domain/RenderCardProps'
import { renderWithWrapper } from '../testHelpers/renderWithWrapper'
import { SwipeableCardStack } from './SwipeableCardStack'

type FruitCardProps = RenderCardProps<{
  fruit: string
}>

const FruitCard = ({ data }: FruitCardProps) => (
  <View>
    <Text>{data.fruit}</Text>
  </View>
)

it('correctly renders', () => {
  renderWithWrapper(
    <SwipeableCardStack
      data={[
        { fruit: 'banana' },
        { fruit: 'apple' },
        { fruit: 'lemon' },
        { fruit: 'strawberry' },
      ]}
      renderCard={FruitCard}
    />,
  )

  expect(screen.getByText('banana')).toBeOnTheScreen()
  expect(screen).toMatchSnapshot()
})

it('respects the initialIndex prop', () => {
  renderWithWrapper(
    <SwipeableCardStack
      data={[
        { fruit: 'banana' },
        { fruit: 'apple' },
        { fruit: 'lemon' },
        { fruit: 'strawberry' },
      ]}
      renderCard={FruitCard}
      initialIndex={2}
    />,
  )

  expect(screen.queryByText('banana')).not.toBeOnTheScreen()
  expect(screen.getByTestId('swipeable-card-wrapper-1')).toHaveStyle({
    opacity: 0,
  })
  expect(screen.getByText('lemon')).toBeOnTheScreen()
})
