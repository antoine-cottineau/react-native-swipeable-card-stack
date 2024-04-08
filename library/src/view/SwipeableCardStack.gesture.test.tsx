import { waitFor } from '@testing-library/react-native'
import { type PanGesture } from 'react-native-gesture-handler'
import {
  fireGestureHandler,
  getByGestureTestId,
} from 'react-native-gesture-handler/jest-utils'
import { type SwipeUpdate } from '..'
import { type FruitItem, FruitStack } from '../testHelpers/FruitStack'
import { renderWithWrapper } from '../testHelpers/renderWithWrapper'

it('calls onActiveCardUpdate with the correct payloads when two cards are swiped with gestures', async () => {
  const onActiveCardUpdate = jest.fn()
  renderWithWrapper(
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

  fireGestureHandler<PanGesture>(
    getByGestureTestId('swipeable-card-wrapper-0-gesture'),
    [{ translationX: -280, velocityX: -20 }],
  )

  await waitFor(() => {
    expect(onActiveCardUpdate).toHaveBeenCalledTimes(4)
  })

  expect(onActiveCardUpdate).toHaveBeenNthCalledWith<[SwipeUpdate<FruitItem>]>(
    1,
    {
      direction: 'left',
      phase: 'started',
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
      phase: 'above-threshold',
      currentDataItem: { fruit: 'banana' },
      currentIndex: 0,
    },
  )

  expect(onActiveCardUpdate).toHaveBeenNthCalledWith<[SwipeUpdate<FruitItem>]>(
    4,
    {
      direction: 'left',
      phase: 'ended',
      currentDataItem: { fruit: 'banana' },
      currentIndex: 0,
    },
  )
})

it('calls onActiveCardUpdate with the correct payloads when a swipe is stopped before threshold', async () => {
  const onActiveCardUpdate = jest.fn()
  renderWithWrapper(
    <FruitStack
      validateSwipeTranslationThreshold={{
        x: 260,
        y: 480,
      }}
      endedSwipePosition={{
        x: 320,
        y: 640,
      }}
      onActiveCardUpdate={onActiveCardUpdate}
    />,
  )

  fireGestureHandler<PanGesture>(
    getByGestureTestId('swipeable-card-wrapper-0-gesture'),
    [{ translationX: 100, velocityX: 20 }],
  )

  await waitFor(() => {
    expect(onActiveCardUpdate).toHaveBeenCalledTimes(2)
  })

  expect(onActiveCardUpdate).toHaveBeenNthCalledWith<[SwipeUpdate<FruitItem>]>(
    1,
    {
      direction: 'right',
      phase: 'started',
      currentDataItem: { fruit: 'banana' },
      currentIndex: 0,
    },
  )

  expect(onActiveCardUpdate).toHaveBeenNthCalledWith<[SwipeUpdate<FruitItem>]>(
    2,
    {
      direction: 'right',
      phase: 'stopped',
      currentDataItem: { fruit: 'banana' },
      currentIndex: 0,
    },
  )
})

it('calls onActiveCardUpdate with the correct payloads when a swipe is stopped before threshold', async () => {
  const onActiveCardUpdate = jest.fn()
  renderWithWrapper(
    <FruitStack
      validateSwipeTranslationThreshold={{
        x: 260,
        y: 480,
      }}
      endedSwipePosition={{
        x: 320,
        y: 640,
      }}
      onActiveCardUpdate={onActiveCardUpdate}
    />,
  )

  fireGestureHandler<PanGesture>(
    getByGestureTestId('swipeable-card-wrapper-0-gesture'),
    [{ translationX: 100, velocityX: 20 }],
  )

  await waitFor(() => {
    expect(onActiveCardUpdate).toHaveBeenCalledTimes(2)
  })

  expect(onActiveCardUpdate).toHaveBeenNthCalledWith<[SwipeUpdate<FruitItem>]>(
    1,
    {
      direction: 'right',
      phase: 'started',
      currentDataItem: { fruit: 'banana' },
      currentIndex: 0,
    },
  )

  expect(onActiveCardUpdate).toHaveBeenNthCalledWith<[SwipeUpdate<FruitItem>]>(
    2,
    {
      direction: 'right',
      phase: 'stopped',
      currentDataItem: { fruit: 'banana' },
      currentIndex: 0,
    },
  )
})
