import BN from 'bn.js'

import { Avatar, AvatarProps } from 'antd'

import gradients from './gradients.json'

const string2Number = (seed: string, limit: number) => {
  const buf = Buffer.from(seed)
  const index = new BN(buf).mod(new BN(limit))
  return Number(index)
}

export type GradientAvatarProps = { seed?: string; avatarProps?: AvatarProps }

const GradientAvatar = ({
  seed = Math.random().toString(),
  avatarProps = {},
}: GradientAvatarProps) => {
  const direction = string2Number(seed, 360)
  const { name, colors } = gradients[string2Number(seed, gradients.length)]
  return (
    <Avatar
      style={{
        background: `linear-gradient(${direction}deg, ${colors.join(', ')})`,
      }}
      alt={name}
      {...avatarProps}
    />
  )
}

export default GradientAvatar
