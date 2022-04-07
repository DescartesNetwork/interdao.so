import { Row, Col, Typography } from 'antd'
import CardDAO from './cardDAO'

const NotVerifiedDAOs = () => {
  return (
    <Row gutter={[24, 24]}>
      {/* Header */}
      <Col span={24}>
        <Typography.Title level={2}>Not verified DAOs</Typography.Title>
      </Col>
      {/* List DAO not verified */}
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {[1, 2, 3, 4].map((dao) => (
            <Col xs={12} md={6} style={{ height: '100%' }} key={dao}>
              <CardDAO daoAddress={''} size="small" />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}
export default NotVerifiedDAOs
