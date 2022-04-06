import { useSelector } from 'react-redux'

import { Row, Col, Typography, Space } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import DaoWatcher from './watcher/dao.watcher'

import { AppState } from 'app/model'

const View = () => {
  const { dao } = useSelector((state: AppState) => state)

  console.log(dao)

  return (
    <Row gutter={[24, 24]} align="middle">
      <Col span={24}>
        <Space align="center">
          <IonIcon name="newspaper-outline" />
          <Typography.Title level={4}>App View</Typography.Title>
        </Space>
      </Col>
      <DaoWatcher />
    </Row>
  )
}

export default View
