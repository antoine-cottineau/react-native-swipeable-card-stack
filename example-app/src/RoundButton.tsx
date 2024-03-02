import { css } from '@emotion/native'
import { Pressable } from 'react-native'
import { IconType } from './icons/Icon'

const SIZE = 80

type Props = {
  onPress: () => void
  Icon: IconType
}

export const RoundButton = ({ onPress, Icon }: Props) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) =>
      css({
        width: SIZE,
        aspectRatio: 1,
        borderRadius: SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pressed ? '#0056b3' : '#007bff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
      })
    }
  >
    <Icon size={SIZE / 2.5} color="white" />
  </Pressable>
)
