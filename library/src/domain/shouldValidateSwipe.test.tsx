import { shouldValidateSwipe } from './shouldValidateSwipe'

it('returns false for a swipe with no translation nor velocity', () => {
  expect(
    shouldValidateSwipe({
      translation: 0,
      velocity: 0,
      translationThreshold: 200,
      velocityThreshold: 600,
      axis: 'x',
      lockedDirections: [],
    }),
  ).toBe(false)
})

it('returns true for a swipe with enough positive translation and positive velocity', () => {
  expect(
    shouldValidateSwipe({
      translation: 300,
      velocity: 30,
      translationThreshold: 200,
      velocityThreshold: 600,
      axis: 'y',
      lockedDirections: [],
    }),
  ).toBe(true)
})

it('returns true for a swipe with enough negative translation and negative velocity', () => {
  expect(
    shouldValidateSwipe({
      translation: -300,
      velocity: -30,
      translationThreshold: 200,
      velocityThreshold: 600,
      axis: 'x',
      lockedDirections: [],
    }),
  ).toBe(true)
})

it('returns false for a swipe with enough translation but a velocity in the wrong direction', () => {
  expect(
    shouldValidateSwipe({
      translation: -300,
      velocity: 30,
      translationThreshold: 200,
      velocityThreshold: 600,
      axis: 'y',
      lockedDirections: [],
    }),
  ).toBe(false)
})

it('returns true for a swipe with enough velocity but not enough translation', () => {
  expect(
    shouldValidateSwipe({
      translation: 60,
      velocity: 700,
      translationThreshold: 200,
      velocityThreshold: 600,
      axis: 'x',
      lockedDirections: [],
    }),
  ).toBe(true)
})

it('returns false for a swipe with enough velocity but in the wrong direction', () => {
  expect(
    shouldValidateSwipe({
      translation: -60,
      velocity: 700,
      translationThreshold: 200,
      velocityThreshold: 600,
      axis: 'y',
      lockedDirections: [],
    }),
  ).toBe(false)
})

it('returns false for a swipe with enough translation but in a locked direction', () => {
  expect(
    shouldValidateSwipe({
      translation: -300,
      velocity: -40,
      translationThreshold: 200,
      velocityThreshold: 600,
      axis: 'x',
      lockedDirections: ['left'],
    }),
  ).toBe(false)
})

it('returns false for a swipe with enough velocity but in a locked direction', () => {
  expect(
    shouldValidateSwipe({
      translation: 100,
      velocity: 700,
      translationThreshold: 200,
      velocityThreshold: 600,
      axis: 'y',
      lockedDirections: ['bottom'],
    }),
  ).toBe(false)
})

it('returns true for a swipe with enough translation even if all other directions are locked', () => {
  expect(
    shouldValidateSwipe({
      translation: 300,
      velocity: 200,
      translationThreshold: 200,
      velocityThreshold: 600,
      axis: 'x',
      lockedDirections: ['left', 'top', 'bottom'],
    }),
  ).toBe(true)
})
