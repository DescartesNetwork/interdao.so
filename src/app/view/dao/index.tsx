import { Row, Col, Typography } from 'antd'
import DaoInitialization from './daoInitialization'
import DaoList from './daoList'

const Dao = () => {
  return (
    <Row gutter={[24, 24]} align="middle">
      <Col flex="auto">
        <Typography.Title level={3} type="secondary">
          DAOs
        </Typography.Title>
      </Col>
      <Col>
        <DaoInitialization />
      </Col>
      <Col span={24}>
        <DaoList />
      </Col>
    </Row>
  )
}

export default Dao
