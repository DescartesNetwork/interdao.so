import { ReactNode } from 'react'

import { Space, SpaceProps, Typography } from 'antd'

const RowSpaceVertical = ({
  label = '',
  value,
  ...rest
}: {
  label?: string
  value: ReactNode
} & SpaceProps) => {
  return (
    <Space {...rest} direction="vertical">
      <Typography.Text type="secondary">{label}</Typography.Text>
      {value}
    </Space>
  )
}

export default RowSpaceVertical
