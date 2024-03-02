import { css } from '@emotion/native'
import { Pressable } from 'react-native'
import { IconType } from './icons/Icon'

const SIZE = 80

type Props = {
  onPress: () => void
  Icon: IconType
  color: string
}

export const RoundButton = ({ onPress, Icon, color }: Props) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) =>
      css({
        width: SIZE,
        aspectRatio: 1,
        borderRadius: SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pressed ? color : undefined,
        borderWidth: 1,
        borderColor: color,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
      })
    }
  >
    {({ pressed }) => (
      <Icon size={SIZE / 2} color={pressed ? 'white' : color} />
    )}
  </Pressable>
)
