import { Col, Row } from 'antd'
import RegimeInput from './regimeInput'
import CirculatingSupply from '../circulatingSupply'
import TokenAddressInput from './tokenAddressInput'
import Privacy from '../../components/privacy'

import './index.less'

const DaoRule = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <RegimeInput />
      </Col>
      <Col span={24}>
        <TokenAddressInput />
      </Col>
      <Col span={24}>
        <CirculatingSupply />
      </Col>
      <Col span={24}>
        <Privacy />
      </Col>
    </Row>
  )
}

export default DaoRule
