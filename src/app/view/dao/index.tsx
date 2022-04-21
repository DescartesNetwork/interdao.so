import { useHistory } from 'react-router-dom'

import { Row, Col, Button, Tabs } from 'antd'
import IonIcon from 'shared/antd/ionicon'
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
      <Col span={24}>
        <Tabs
          style={{ overflow: 'visible' }}
          tabBarExtraContent={
            <Button
              type="primary"
              onClick={() => history.push(`/app/${appId}/dao/new-dao`)}
              icon={<IonIcon name="add-outline" />}
            >
              New DAO
            </Button>
          }
        >
          <Tabs.TabPane tab="Community DAOs" key="community-daos">
            <DaoList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Your DAOs" key="your-daos">
            <YourDaos />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  )
}

export default Dao
