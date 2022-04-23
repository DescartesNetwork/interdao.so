import { Progress, Space, Typography } from 'antd'

export type CreateDaoTitleProps = {
  step: number
  onHandleStep?: () => void
  onSetMetaData?: () => void
  onConfirm?: () => void
}

const DEFAULT_PERCENT = 25

const CreateDaoTitle = ({ step }: CreateDaoTitleProps) => {
  return (
    <Space direction="vertical" size={12}>
      <Typography.Title level={1}>Choose type of DAO</Typography.Title>
      <Progress
        percent={step * DEFAULT_PERCENT + DEFAULT_PERCENT}
        steps={4}
        showInfo={false}
      />
    </Space>
  )
}

export default CreateDaoTitle
