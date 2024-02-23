import { AnimatedComponent } from './AnimatedComponent'
import { TestComponent } from './TestComponent'

console.log('here')

export { TestComponent, AnimatedComponent }

export type A = {
  b: string
}

export const a = (): A => {
  return {
    b: 'fzejioze',
  }
}
