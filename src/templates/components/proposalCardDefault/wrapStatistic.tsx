import { MintAvatar, MintSymbol } from '@sen-use/app'
import { Space, Typography } from 'antd'
import RowSpaceVertical from 'components/ui/rowSpaceVertical'

import { ComponentConfigs } from '../templateForm'

const WrapStatistic = ({
  configs,
  value,
}: {
  configs: ComponentConfigs<any>
  value: string
}) => {
  if (configs.type === 'mint-select')
    return (
      <RowSpaceVertical
        label={configs.title}
        value={
          <Typography.Text className="t-16">
            <Space>
              <MintAvatar mintAddress={value} />
              <MintSymbol mintAddress={value} />
            </Space>
          </Typography.Text>
        }
      />
    )

  if (configs.type === 'number')
    return (
      <RowSpaceVertical
        className="t-16"
        label={configs.title}
        value={value || '--'}
      />
    )

  return null
}

export default WrapStatistic
