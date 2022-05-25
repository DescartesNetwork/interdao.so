import { Progress, Space, Typography } from 'antd'

export type InitDAOHeaderProps = {
  step: number
  onHandleStep?: () => void
  onConfirm?: () => void
  loading?: boolean
  disabled?: boolean
}

const DEFAULT_PERCENT = 25
const DAO_PROGRESS_TITLE = [
  'Choose type of DAO',
  'Input DAO infomation',
  'Set the rule',
  'Review',
]

const InitDAOHeader = ({ step }: InitDAOHeaderProps) => {
  return (
    <Space direction="vertical" size={12}>
      <Typography.Title level={1}>{DAO_PROGRESS_TITLE[step]}</Typography.Title>
      <Progress
        className="create-progress"
        percent={step * DEFAULT_PERCENT + DEFAULT_PERCENT}
        steps={4}
        showInfo={false}
      />
    </Space>
  )
}

export default InitDAOHeader
