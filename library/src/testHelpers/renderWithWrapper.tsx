import { render } from '@testing-library/react-native'
import { type ReactNode, type ReactElement } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export const renderWithWrapper = <T,>(component: ReactElement<T>) => {
  render(component, { wrapper: Wrapper })
}

const Wrapper = ({ children }: { children: ReactNode }) => (
  <SafeAreaProvider>{children}</SafeAreaProvider>
)
