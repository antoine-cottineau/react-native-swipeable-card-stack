import { isSwipeLocked } from './isSwipeLocked'

it('returns true if swipe is in a locked horizontal direction', () => {
  expect(
    isSwipeLocked({
      translation: 200,
      axis: 'x',
      lockedDirections: ['right'],
    }),
  ).toBe(true)
})

it('returns true if swipe is in a locked vertical direction', () => {
  expect(
    isSwipeLocked({
      translation: 200,
      axis: 'y',
      lockedDirections: ['bottom'],
    }),
  ).toBe(true)
})

it('returns false if swipe is in a direction that is not locked', () => {
  expect(
    isSwipeLocked({
      translation: 200,
      axis: 'y',
      lockedDirections: ['top', 'left', 'right'],
    }),
  ).toBe(false)
})
