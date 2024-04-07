import { css } from '@emotion/native'
import { Pressable } from 'react-native'
import { type IconType } from '../icons/Icon'

type Props = {
  onPress: () => void
  Icon: IconType
  color: string
  size: number
}

export const RoundButton = ({ onPress, Icon, color, size }: Props) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) =>
      css({
        width: size,
        aspectRatio: 1,
        borderRadius: size / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pressed ? color : undefined,
        borderWidth: 1.5,
        borderColor: color,
      })
    }
  >
    {({ pressed }) => (
      <Icon size={size / 2} color={pressed ? 'white' : color} />
    )}
  </Pressable>
)
