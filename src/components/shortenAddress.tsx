import { util } from '@sentre/senhub'

import { Space, Typography } from 'antd'
import IconCopy from './iconCopy'

export const ShortenAddress = ({
  address,
  size = 3,
}: {
  address: string
  size?: number
}) => {
  return (
    <Space size={10}>
      <Typography.Text
        style={{ cursor: 'pointer', textDecoration: 'underline' }}
        onClick={() => window.open(util.explorer(address), '_blank')}
      >
        {util.shortenAddress(address, size)}
      </Typography.Text>
      <IconCopy value={address} />
    </Space>
  )
}
