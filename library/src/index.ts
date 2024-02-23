import { AnimatedComponent } from './AnimatedComponent'
import { GestureComponent } from './GestureComponent'
import { TestComponent } from './TestComponent'

console.log('here')

export { TestComponent, AnimatedComponent, GestureComponent }

export type A = {
  b: string
}

export const a = (): A => {
  return {
    b: 'fzejioze',
  }
}
