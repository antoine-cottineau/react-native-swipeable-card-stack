import { render, screen } from '@testing-library/react-native'
import { type ReactNode } from 'react'
import { View, Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { type RenderCardProps } from '../domain/RenderCardProps'
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
  render(
    <SwipeableCardStack
      data={[
        { fruit: 'banana' },
        { fruit: 'apple' },
        { fruit: 'lemon' },
        { fruit: 'strawberry' },
      ]}
      renderCard={FruitCard}
    />,
    { wrapper: TestWrapper },
  )

  expect(screen.getByText('banana')).toBeOnTheScreen()
})

const TestWrapper = ({ children }: { children: ReactNode }) => (
  <SafeAreaProvider>{children}</SafeAreaProvider>
)
