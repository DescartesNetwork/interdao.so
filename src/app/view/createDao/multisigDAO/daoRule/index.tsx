import { Col, Row } from 'antd'
import Regime from './regime'
import DAOMembers from './daoMembers'
import Privacy from '../../components/privacy'

const MultiSigDAORule = () => {
  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <Regime />
      </Col>
      <Col span={24}>
        <Privacy />
      </Col>
      <Col span={24}>
        <DAOMembers />
      </Col>
    </Row>
  )
}

export default MultiSigDAORule