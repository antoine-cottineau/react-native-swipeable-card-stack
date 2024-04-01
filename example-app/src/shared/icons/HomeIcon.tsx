import { Path } from 'react-native-svg'
import { Icon, type IconProps } from './Icon'

export const HomeIcon = (props: IconProps) => (
  <Icon viewBox="0 -960 960 960" {...props}>
    <Path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z" />
  </Icon>
)
