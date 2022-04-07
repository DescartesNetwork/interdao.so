import { Col, Row, Typography } from 'antd'
import CardDAO from './cardDAO'

const NormalDAOs = () => {
  return (
    <Row gutter={[24, 24]}>
      {/* Header */}
      <Col span={24}>
        <Typography.Title level={2}>Normal DAOs</Typography.Title>
      </Col>
      {/* List normal DAO */}
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {[1, 2, 3, 4].map((dao) => (
            <Col xs={12} md={8} style={{ height: '100%' }} key={dao}>
              <CardDAO daoAddress={''} size="medium" />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}
export default NormalDAOs
