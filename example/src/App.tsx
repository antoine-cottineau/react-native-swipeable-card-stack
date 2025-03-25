import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CatStack } from './CatStack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <CatStack />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
