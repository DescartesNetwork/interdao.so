import { Button, Col, Row, Space, Typography, Input } from 'antd'
import CardDAO from './cardDAO'

import IonIcon from 'shared/antd/ionicon'

const VerifiedDAOs = () => {
  return (
    <Row gutter={[24, 24]}>
      {/* Header */}
      <Col span={24}>
        <Row justify="space-between">
          <Col>
            <Typography.Title level={2}>DAOs</Typography.Title>
          </Col>
          <Col>
            <Space size={10}>
              <Input prefix={<IonIcon name="search-outline" />} />
              <Button ghost icon={<IonIcon name="add-outline" />}>
                New DAO
              </Button>
            </Space>
          </Col>
        </Row>
      </Col>
      {/* List Verified DAO */}
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {[1, 2, 3, 4].map((dao) => (
            <Col xs={24} md={12} style={{ height: '100%' }} key={dao}>
              <CardDAO daoAddress={''} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}
export default VerifiedDAOs
