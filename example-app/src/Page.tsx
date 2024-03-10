import styled from '@emotion/native'
import { type ViewProps } from 'react-native'

export const Page = (props: ViewProps) => <Container {...props} />

const Container = styled.View({
  flex: 1,
  backgroundColor: 'white',
})
