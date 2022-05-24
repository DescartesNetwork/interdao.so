import { useParams } from 'react-router-dom'

import { Card, Col, Row, Tabs, Typography } from 'antd'
import Information from './information'
import Rule from './rule'
import TransferAuthority from './transferAuthority'

import './index.less'

const EditDAO = () => {
  const { daoAddress } = useParams<{ daoAddress: string }>()

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} lg={16}>
        <Card bodyStyle={{ padding: 0 }} bordered={false} className="edit-dao">
          <Row>
            <Col span={24} className="edit-dao_header">
              <Typography.Title level={4}>Edit DAO</Typography.Title>
            </Col>
            <Col span={24} className="edit-dao_body">
              <Tabs>
                <Tabs.TabPane key="information" tab="Information">
                  <Information daoAddress={daoAddress} />
                </Tabs.TabPane>
                <Tabs.TabPane key="rule" tab="Rule">
                  <Rule daoAddress={daoAddress} />
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
