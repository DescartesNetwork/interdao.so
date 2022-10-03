import { useHistory } from 'react-router-dom'

import { Row, Button, Col, ButtonProps } from 'antd'

import { APP_ROUTE } from 'configs/route'

type ActionButtonProps = {
  daoAddress: string
  onSave: () => void
} & ButtonProps

const ActionButton = ({ daoAddress, onSave, ...rest }: ActionButtonProps) => {
  const history = useHistory()

  const onCancel = async () => {
    history.push(APP_ROUTE.daoDetails.generatePath({ daoAddress }))
  }

  return (
    <Row>
      <Col flex="auto">
        <Button size="large" onClick={onCancel} type="text">
          Cancel
        </Button>
      </Col>
      <Col>
        <Button size="large" {...rest} onClick={onSave} type="primary">
          Save
        </Button>
      </Col>
    </Row>
  )
}

export default ActionButton
