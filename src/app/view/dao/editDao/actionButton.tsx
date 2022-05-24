import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Row, Button, Col } from 'antd'

import configs from 'app/configs'
import { AppDispatch } from 'app/model'
import { setCreateDaoData } from 'app/model/dao.controller'
import { setCreateDaoMetaData } from 'app/model/metadata.controller'

const {
  manifest: { appId },
} = configs

type ActionButtonProps = {
  daoAddress: string
  loading: boolean
  onSave: () => void
}

const ActionButton = ({ daoAddress, onSave, loading }: ActionButtonProps) => {
  const history = useHistory()
  const dispatch = useDispatch<AppDispatch>()

  const onCancel = async () => {
    await dispatch(setCreateDaoData())
    await dispatch(setCreateDaoMetaData())
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
        <Button loading={loading} onClick={onSave} type="primary">
          Save
        </Button>
      </Col>
    </Row>
  )
}

export default ActionButton
