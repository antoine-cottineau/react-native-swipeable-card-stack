import { fireEvent, screen, waitFor } from '@testing-library/react-native'
import { useRef } from 'react'
import { View, Text, Button } from 'react-native'
import { type RenderCardProps } from '../domain/RenderCardProps'
import { type SwipeUpdate } from '../domain/SwipeUpdate'
import { type SwipeableCardRef } from '../domain/SwipeableCardRef'
import { renderWithWrapper } from '../testHelpers/renderWithWrapper'
import { SwipeableCardStack } from './SwipeableCardStack'

type FruitItem = {
  fruit: string
}

type FruitCardProps = RenderCardProps<FruitItem>

const FruitCard = ({ fruit }: FruitCardProps) => (
  <View>
    <Text>{fruit}</Text>
  </View>
)

const onActiveCardUpdate = jest.fn()

const FruitStack = () => {
  const ref = useRef<SwipeableCardRef>(null)

  return (
    <>
      <SwipeableCardStack
        data={[
          { fruit: 'banana' },
          { fruit: 'apple' },
          { fruit: 'lemon' },
          { fruit: 'strawberry' },
        ]}
        renderCard={FruitCard}
        endedSwipePosition={{
          x: 300,
          y: 400,
        }}
        ref={ref}
        onActiveCardUpdate={onActiveCardUpdate}
      />
      <Button title="Swipe left" onPress={() => ref.current?.swipe('left')} />
      <Button title="Swipe top" onPress={() => ref.current?.swipe('top')} />
    </>
  )
}

it('calls onActiveCardUpdate with the correct payloads when two cards are swiped', async () => {
  renderWithWrapper(<FruitStack />)

  fireEvent.press(screen.getByText('Swipe left'))

  await waitFor(() => {
    expect(onActiveCardUpdate).toHaveBeenCalledTimes(3)
  })

  expect(onActiveCardUpdate).toHaveBeenNthCalledWith<[SwipeUpdate<FruitItem>]>(
    1,
    {
      direction: 'left',
      phase: 'above-threshold',
      currentDataItem: { fruit: 'banana' },
      currentIndex: 0,
    },
  )

  expect(onActiveCardUpdate).toHaveBeenNthCalledWith<[SwipeUpdate<FruitItem>]>(
    2,
    {
      direction: 'left',
      phase: 'validated',
      currentDataItem: { fruit: 'banana' },
      currentIndex: 0,
    },
  )

  expect(onActiveCardUpdate).toHaveBeenNthCalledWith<[SwipeUpdate<FruitItem>]>(
    3,
    {
      direction: 'left',
      phase: 'ended',
      currentDataItem: { fruit: 'banana' },
      currentIndex: 0,
    },
  )

  fireEvent.press(screen.getByText('Swipe top'))

  await waitFor(() => {
    expect(onActiveCardUpdate).toHaveBeenCalledTimes(6)
  })

  expect(onActiveCardUpdate).toHaveBeenNthCalledWith<[SwipeUpdate<FruitItem>]>(
    4,
    {
      direction: 'top',
      phase: 'above-threshold',
      currentDataItem: { fruit: 'apple' },
      currentIndex: 1,
    },
  )

  expect(onActiveCardUpdate).toHaveBeenNthCalledWith<[SwipeUpdate<FruitItem>]>(
    5,
    {
      direction: 'top',
      phase: 'validated',
      currentDataItem: { fruit: 'apple' },
      currentIndex: 1,
    },
  )

  expect(onActiveCardUpdate).toHaveBeenNthCalledWith<[SwipeUpdate<FruitItem>]>(
    6,
    {
      direction: 'top',
      phase: 'ended',
      currentDataItem: { fruit: 'apple' },
      currentIndex: 1,
    },
  )
})
