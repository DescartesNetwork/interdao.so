import { ReactNode } from 'react'

import { Space, Typography } from 'antd'

export type DaoCardStatisticProps = {
  title: string
  value: string | number | ReactNode
}
const DaoCardStatistic = ({ title, value }: DaoCardStatisticProps) => {
  return (
    <Space direction="vertical">
      <Typography.Text className="caption" type="secondary">
        {title}
      </Typography.Text>
      {['number', 'string'].includes(typeof value) ? (
        <Typography.Text>{value}</Typography.Text>
      ) : (
        value
      )}
    </Space>
  )
}

export default DaoCardStatistic
