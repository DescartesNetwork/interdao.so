import { DaoRegimes } from '@interdao/core'

import { Col, Row, Typography } from 'antd'

import CardRegime from '../../components/cardRegime'

const Regime = () => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text>DAO Regime</Typography.Text>
      </Col>
      <Col xs={24} md={8}>
        <CardRegime
          value={DaoRegimes.Autonomous}
          regime={DaoRegimes.Autonomous}
        />
      </Col>
    </Row>
  )
}

export default Regime
