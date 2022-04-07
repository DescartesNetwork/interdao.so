import { Col, Row, Typography } from 'antd'
import CardDAO from './cardDAO'

const YourDAOs = () => {
  return (
    <Row gutter={[24, 24]}>
      {/* Header */}
      <Col span={24}>
        <Typography.Title level={2}>Your DAOs</Typography.Title>
      </Col>
      {/* List normal DAO */}
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {[1].map((dao) => (
            <Col span={24} key={dao}>
              <CardDAO daoAddress={''} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}
export default YourDAOs
