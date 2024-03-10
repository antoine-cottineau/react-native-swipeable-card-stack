import { type ReactElement, type ReactNode } from 'react'
import { Svg } from 'react-native-svg'

export type IconProps = {
  size: number
  color: string
}

type Props = IconProps & { children: ReactNode; viewBox: string }

export type IconType = (props: IconProps) => ReactElement

export const Icon = ({ size, color, children, viewBox }: Props) => (
  <Svg width={size} height={size} fill={color} viewBox={viewBox}>
    {children}
  </Svg>
)
