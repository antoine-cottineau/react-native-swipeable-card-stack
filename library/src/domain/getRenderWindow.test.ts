import { getRenderWindow } from './getRenderWindow'

it('it returns the correct render window when no card has been swiped', () => {
  expect(
    getRenderWindow({
      currentIndex: 0,
      dataLength: 10,
      numberOfRenderedCards: 3,
    }),
  ).toStrictEqual([0, 3])
})

it('it returns the correct render window when one card has been swiped', () => {
  expect(
    getRenderWindow({
      currentIndex: 1,
      dataLength: 10,
      numberOfRenderedCards: 5,
    }),
  ).toStrictEqual([0, 6])
})

it('it returns the correct render window when more than one cards have been swiped', () => {
  expect(
    getRenderWindow({
      currentIndex: 6,
      dataLength: 15,
      numberOfRenderedCards: 5,
    }),
  ).toStrictEqual([5, 11])
})

it('it returns the correct render window when there are not enough cards left', () => {
  expect(
    getRenderWindow({
      currentIndex: 6,
      dataLength: 10,
      numberOfRenderedCards: 5,
    }),
  ).toStrictEqual([5, 9])
})

it('it returns the correct render window when there is only one unswiped card', () => {
  expect(
    getRenderWindow({
      currentIndex: 7,
      dataLength: 8,
      numberOfRenderedCards: 5,
    }),
  ).toStrictEqual([6, 7])
})

it('it returns the correct render window when all the cards have been swiped', () => {
  expect(
    getRenderWindow({
      currentIndex: 8,
      dataLength: 8,
      numberOfRenderedCards: 5,
    }),
  ).toStrictEqual([7, 7])
})
