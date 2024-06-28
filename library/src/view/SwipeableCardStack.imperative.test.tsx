import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native'
import { type SwipeUpdate } from '..'
import { type FruitItem, FruitStack } from '../testHelpers/FruitStack'

it('calls onActiveCardUpdate with the correct payloads when two cards are swiped imperatively', async () => {
  const onActiveCardUpdate = jest.fn()
  render(
    <FruitStack
      onActiveCardUpdate={onActiveCardUpdate}
      validateSwipeTranslationThreshold={{
        x: 260,
        y: 480,
      }}
      endedSwipePosition={{
        x: 320,
        y: 640,
      }}
    />,
  )

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
