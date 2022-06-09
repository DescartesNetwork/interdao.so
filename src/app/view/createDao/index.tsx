import { useSelector } from 'react-redux'

import { Row, Col, Card } from 'antd'
import InitDAOHeader from './initDAOHeader'
import InitDAOBody from './initDAOBody'

import { AppState } from 'app/model'

import './index.less'

const CreateDao = () => {
  const step = useSelector((state: AppState) => state.createDao.step)
  return (
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} lg={16}>
        <Card bordered={false}>
          <Row gutter={[24, 32]}>
            <Col span={24}>
              <InitDAOHeader step={step} />
            </Col>
            <Col span={24}>
              <InitDAOBody />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default CreateDao
