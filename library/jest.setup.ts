import '@testing-library/jest-native/extend-expect'
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'
import { setUpTests } from 'react-native-reanimated'
import 'react-native-gesture-handler/jestSetup'

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)
setUpTests()
