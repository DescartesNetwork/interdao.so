import { useParams } from 'react-router-dom'

import { Card, Col, Row, Tabs, Typography } from 'antd'
import Information from './editDaoDetail'
import Rule from './rule'
import TransferAuthority from './transferAuthority'
import EditSupply from './editSupply'

import './index.less'

const EditDAO = () => {
  const { daoAddress } = useParams<{ daoAddress: string }>()

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} lg={16}>
        <Card bodyStyle={{ padding: 0 }} bordered={false} className="edit-dao">
          <Row>
            <Col span={24} className="edit-dao_header">
              <Typography.Title level={4}>Settings DAO </Typography.Title>
            </Col>
            <Col span={24} className="edit-dao_body">
              <Tabs>
                <Tabs.TabPane key="information" tab="Information">
                  <Information daoAddress={daoAddress} />
                </Tabs.TabPane>
                <Tabs.TabPane key="regime" tab="Regime">
                  <Rule daoAddress={daoAddress} />
                </Tabs.TabPane>
                <Tabs.TabPane key="supply" tab="Supply">
                  <EditSupply daoAddress={daoAddress} />
                </Tabs.TabPane>
                <Tabs.TabPane key="transfer-authority" tab="Transfer Authority">
                  <TransferAuthority daoAddress={daoAddress} />
                </Tabs.TabPane>
              </Tabs>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}
export default EditDAO
