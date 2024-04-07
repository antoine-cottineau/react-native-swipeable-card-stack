import { type SwipeDirection } from './SwipeDirection'
import { getSwipeDirection } from './getSwipeDirection'

it('returns "left" for a perfect left swipe', () => {
  expect(
    getSwipeDirection({
      xTranslation: -30,
      yTranslation: 0,
      xEndedSwipePosition: 300,
      yEndedSwipePosition: 400,
    }),
  ).toBe<SwipeDirection>('left')
})

it('returns "top" for a perfect bottom swipe', () => {
  expect(
    getSwipeDirection({
      xTranslation: 0,
      yTranslation: -350,
      xEndedSwipePosition: 300,
      yEndedSwipePosition: 400,
    }),
  ).toBe<SwipeDirection>('top')
})

it('returns the correct direction for a bottom-right swipe - more right than bottom', () => {
  expect(
    getSwipeDirection({
      xTranslation: 290,
      yTranslation: 350,
      xEndedSwipePosition: 300,
      yEndedSwipePosition: 400,
    }),
  ).toBe<SwipeDirection>('right')
})

it('returns the correct direction for a bottom-left swipe - more bottom than left', () => {
  expect(
    getSwipeDirection({
      xTranslation: -60,
      yTranslation: 350,
      xEndedSwipePosition: 300,
      yEndedSwipePosition: 400,
    }),
  ).toBe<SwipeDirection>('bottom')
})
