import { useHistory, useParams } from 'react-router-dom'

import { Button, Card, Col, Row } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ProposalList from './proposalList'
import DaoDetails from '../dao/daoDetails'

import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

const Proposal = () => {
  const history = useHistory()
  const { daoAddress } = useParams<{ daoAddress: string }>()

  return (
    <Row gutter={[24, 24]} align="middle">
      <Col span={24}>
        <Card bordered={false} style={{ borderRadius: 0, boxShadow: 'unset' }}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Button
                icon={<IonIcon name="arrow-back-outline" />}
                type="text"
                onClick={() => history.push(`/app/${appId}/dao`)}
              />
            </Col>
            <Col span={24}>
              <DaoDetails daoAddress={daoAddress} />
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <ProposalList daoAddress={daoAddress} />
      </Col>
    </Row>
  )
}

export default Proposal
