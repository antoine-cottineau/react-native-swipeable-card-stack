import { screen } from '@testing-library/react-native'
import { View, Text } from 'react-native'
import { type RenderCardProps } from '../domain/RenderCardProps'
import { renderWithWrapper } from '../testHelpers/renderWithWrapper'
import { SwipeableCardStack } from './SwipeableCardStack'

type FruitCardProps = RenderCardProps<{
  fruit: string
}>

const FruitCard = ({ fruit }: FruitCardProps) => (
  <View>
    <Text>{fruit}</Text>
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
