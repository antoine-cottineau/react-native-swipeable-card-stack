import { toReversed } from './toReversed'

it('reverses an array', () => {
  expect(toReversed(['banana', 'apple', 'lemon', 'strawberry'])).toStrictEqual([
    'strawberry',
    'lemon',
    'apple',
    'banana',
  ])
})
