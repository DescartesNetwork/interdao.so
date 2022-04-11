import { Card, Space, Typography } from 'antd'
import { MintAvatar, MintName } from 'shared/antd/mint'

import { randomColor } from 'shared/util'

export type MintTagProps = {
  mintAddress: string
  onClick?: (mintAddress: string) => void
}

const MintTag = ({ mintAddress, onClick = () => {} }: MintTagProps) => {
  return (
    <Card
      bodyStyle={{ padding: 8, cursor: 'pointer' }}
      style={{ backgroundColor: randomColor(mintAddress, 0.2) }}
      bordered={false}
      onClick={() => onClick(mintAddress)}
    >
      <Space>
        <MintAvatar mintAddress={mintAddress} />
        <Typography.Text style={{ color: randomColor(mintAddress) }}>
          <MintName mintAddress={mintAddress} />
        </Typography.Text>
      </Space>
    </Card>
  )
}
export default MintTag
