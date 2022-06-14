import { DaoRegime } from '@interdao/core'

import { Col, Row, Typography } from 'antd'
import CardRegime from '../../components/cardRegime'

type RegimeProps = {
  regime: DaoRegime
}

const Regime = ({ regime }: RegimeProps) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text>DAO Regime</Typography.Text>
      </Col>
      <Col xs={24} md={8}>
        <CardRegime value={regime} regime={regime} />
      </Col>
    </Row>
  )
}

export default Regime
