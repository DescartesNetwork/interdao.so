import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Row, Button, Col, ButtonProps } from 'antd'

import configs from 'app/configs'
import { AppDispatch } from 'app/model'
import { setInitDao } from 'app/model/daos.controller'
import { setInitMetadata } from 'app/model/metadata.controller'

const {
  manifest: { appId },
} = configs

type ActionButtonProps = {
  daoAddress: string
  onSave: () => void
} & ButtonProps

const ActionButton = ({ daoAddress, onSave, ...rest }: ActionButtonProps) => {
  const history = useHistory()
  const dispatch = useDispatch<AppDispatch>()

  const onCancel = async () => {
    await dispatch(setInitDao())
    await dispatch(setInitMetadata())
    return history.push(`/app/${appId}/dao/${daoAddress}`)
  }

  return (
    <Row>
      <Col flex="auto">
        <Button onClick={onCancel} type="text">
          Cancel
        </Button>
      </Col>
      <Col>
        <Button {...rest} onClick={onSave} type="primary">
          Save
        </Button>
      </Col>
    </Row>
  )
}

export default ActionButton
