import { css } from '@emotion/native'
import { Pressable } from 'react-native'
import { IconType } from './icons/Icon'

type Size = 'small' | 'large'

type Props = {
  onPress: () => void
  Icon: IconType
  color: string
  size: Size
}

const sizeMapping: Record<Size, number> = {
  small: 70,
  large: 80,
}

export const RoundButton = ({ onPress, Icon, color, size }: Props) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) =>
      css({
        width: sizeMapping[size],
        aspectRatio: 1,
        borderRadius: sizeMapping[size] / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pressed ? color : undefined,
        borderWidth: 1.5,
        borderColor: color,
      })
    }
  >
    {({ pressed }) => (
      <Icon size={sizeMapping[size] / 2} color={pressed ? 'white' : color} />
    )}
  </Pressable>
)
