import styled from '@emotion/native'
import { useNavigation, type NavigationProp } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AnimalIcon } from '../icons/AnimalIcon'
import { HomeButton } from './HomeButton'
import { type RootStackParamList } from './Navigator'
import { Page } from './Page'

export const HomePage = () => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>()

  return (
    <StyledPage>
      <StatusBar style="dark" />
      <SafeAreaView>
        <HomeButton
          title="Cat example"
          subTitle="A classic Tinder-like swipe application"
          Icon={AnimalIcon}
          onPress={() => {
            navigate('CatSwipe')
          }}
        />
      </SafeAreaView>
    </StyledPage>
  )
}

const StyledPage = styled(Page)({
  backgroundColor: '#EDE7F6',
  paddingHorizontal: 16,
})
