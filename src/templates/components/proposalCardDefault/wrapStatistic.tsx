import { MintAvatar, MintSymbol } from '@sen-use/app'
import { Space, Typography } from 'antd'
import RowSpaceVertical from 'components/rowSpaceVertical'

import { ComponentConfigs } from '../templateForm'

const WrapStatistic = ({
  configs,
  value,
}: {
  configs?: ComponentConfigs<any>
  value: string
}) => {
  if (!configs) return null
  if (configs.type === 'address') return null

  if (configs.type === 'mint-select')
    return (
      <Typography.Text className="t-16">
        <Space>
          <MintAvatar mintAddress={value} />
          <MintSymbol mintAddress={value} />
        </Space>
      </Typography.Text>
    )

  if (configs.type === 'number')
    return (
      <RowSpaceVertical className="t-16" label="Amount" value={value || '--'} />
    )

  return null
}

export default WrapStatistic
