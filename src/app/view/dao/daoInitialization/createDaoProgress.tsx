import { Progress, Space, Typography } from 'antd'

export type CreateDaoTitleProps = {
  step: number
  onHandleStep?: () => void
  onConfirm?: () => void
}

const DEFAULT_PERCENT = 25

const CreateDaoProgress = ({ step }: CreateDaoTitleProps) => {
  return (
    <Space direction="vertical" size={12}>
      <Typography.Title level={1}>Choose type of DAO</Typography.Title>
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
