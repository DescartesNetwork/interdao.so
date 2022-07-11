import { useHistory } from 'react-router-dom'

import { Row, Button, Col, ButtonProps } from 'antd'

import configs from 'configs'
import useDaoNameUrl from 'hooks/dao/useDaoNameUrl'

const {
  manifest: { appId },
} = configs

type ActionButtonProps = {
  daoAddress: string
  onSave: () => void
} & ButtonProps

const ActionButton = ({ daoAddress, onSave, ...rest }: ActionButtonProps) => {
  const history = useHistory()
  const { daoNameUrl } = useDaoNameUrl(daoAddress)

  const onCancel = async () => {
    history.push(`/app/${appId}/dao/${daoAddress}/${daoNameUrl}`)
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
