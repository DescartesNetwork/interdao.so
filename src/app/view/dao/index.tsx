import { useHistory } from 'react-router-dom'

import { Row, Col, Button, Tabs } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import Hero from './hero'
import CommunityDaos from './communityDaos'
import YourDaos from './communityDaos/yourDao'
import DaoCanJoin from './daoCanJoin'

import configs from 'app/configs'

import './index.less'

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
        <Row justify="center">
          <Col xs={24} lg={18}>
            <Tabs
              style={{ overflow: 'visible' }}
              className="dao-tabs"
              tabBarExtraContent={
                <Button
                  type="primary"
                  onClick={() => history.push(`/app/${appId}/dao/create-dao`)}
                  icon={<IonIcon name="add-outline" />}
                >
                  Create a DAO
                </Button>
              }
            >
              <Tabs.TabPane tab="Community DAOs" key="community-daos">
                <CommunityDaos />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Your DAOs" key="your-daos">
                <YourDaos />
              </Tabs.TabPane>
              <Tabs.TabPane tab="DAOs can join" key="daos-can-join">
                <DaoCanJoin />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Dao
