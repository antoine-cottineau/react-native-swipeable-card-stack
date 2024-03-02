import { css } from '@emotion/native'
import { Pressable } from 'react-native'

const SIZE = 80

type Props = {
  onPress: () => void
}

export const RoundButton = ({ onPress }: Props) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) =>
      css({
        width: SIZE,
        aspectRatio: 1,
        borderRadius: SIZE / 2,
        backgroundColor: pressed ? '#0056b3' : '#007bff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
      })
    }
  ></Pressable>
)
