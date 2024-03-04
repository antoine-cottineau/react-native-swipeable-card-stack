import styled from '@emotion/native'
import { ViewProps } from 'react-native'

export const Page = (props: ViewProps) => {
  return <Container {...props} />
}

const Container = styled.View({
  flex: 1,
  backgroundColor: 'white',
})
