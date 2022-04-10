import { useHistory } from 'react-router-dom'

import { Row, Col, Typography, Button } from 'antd'
import Hero from './hero'
import DaoList from './daoList'
import YourDaos from './daoList/yourDao'

import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

const Dao = () => {
  const history = useHistory()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Hero />
      </Col>
      <Col xs={24}>
        <Typography.Title level={3}>Your DAOs</Typography.Title>
      </Col>
      <Col xs={24}>
        <YourDaos />
      </Col>
      <Col span={24} /> {/* Safe space */}
      <Col xs={24}>
        <Row gutter={[24, 24]} align="middle">
          <Col flex="auto">
            <Typography.Title level={3}>DAOs</Typography.Title>
          </Col>
          <Col>
            <Button
              ghost
              onClick={() => history.push(`/app/${appId}/dao/new-dao`)}
            >
              New DAO
            </Button>
          </Col>
        </Row>
      </Col>
      <Col xs={24}>
        <DaoList />
      </Col>
    </Row>
  )
}

export default Dao
