import { Avatar, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'

const Header = ({
  stepValue,
  label,
  done,
}: {
  stepValue: number
  label: string
  done: boolean
}) => {
  return (
    <Space size={26}>
      {!done ? (
        <Avatar className="create-proposal-avt">{stepValue}</Avatar>
      ) : (
        <Avatar className="create-proposal-avt done-step">
          <IonIcon name="checkmark-outline" />
        </Avatar>
      )}
      <Typography.Title level={3}>{label}</Typography.Title>
    </Space>
  )
}

export default Header
