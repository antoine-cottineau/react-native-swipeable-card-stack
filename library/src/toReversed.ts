export const toReversed = <T>(array: T[]) => {
  const reversedArray = array.slice()
  reversedArray.reverse()
  return reversedArray
}
