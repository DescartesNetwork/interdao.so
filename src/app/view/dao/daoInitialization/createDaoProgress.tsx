import { Progress, Space, Typography } from 'antd'

export type CreateDaoTitleProps = {
  step: number
  onHandleStep?: () => void
  onConfirm?: () => void
}

const DEFAULT_PERCENT = 25
const DAO_PROGRESS_TITILE = [
  'Choose type of DAO',
  'Input DAO infomation',
  'Set the rule',
  'Review',
]

const CreateDaoProgress = ({ step }: CreateDaoTitleProps) => {
  return (
    <Space direction="vertical" size={12}>
      <Typography.Title level={1}>{DAO_PROGRESS_TITILE[step]}</Typography.Title>
      <Progress
        className="create-progress"
        percent={step * DEFAULT_PERCENT + DEFAULT_PERCENT}
        steps={4}
        showInfo={false}
      />
    </Space>
  )
}

export default CreateDaoProgress
