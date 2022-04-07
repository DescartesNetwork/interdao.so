import { useHistory } from 'react-router-dom'

import { Row, Col, Typography, Button } from 'antd'
import DaoList from './daoList'
import YourDaos from './daoList/yourDao'

const Dao = () => {
  const history = useHistory()

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} lg={18}>
        <Typography.Title level={3}>Your DAOs</Typography.Title>
      </Col>
      <Col xs={24} lg={18}>
        <YourDaos />
      </Col>
      <Col span={24} /> {/* Safe space */}
      <Col xs={24} lg={18}>
        <Row gutter={[24, 24]} align="middle">
          <Col flex="auto">
            <Typography.Title level={3}>DAOs</Typography.Title>
          </Col>
          <Col>
            <Button ghost onClick={() => history.push('new-dao')}>
              New DAO
            </Button>
          </Col>
        </Row>
      </Col>
      <Col xs={24} lg={18}>
        <DaoList />
      </Col>
    </Row>
  )
}

export default Dao
