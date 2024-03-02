import 'react'

declare module 'react' {
  function forwardRef<T, P = Record<string, unknown>>(
    render: (props: P, ref: Ref<T>) => ReactNode | null,
  ): (props: P & RefAttributes<T>) => ReactNode | null
}
