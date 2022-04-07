import { useHistory, useParams } from 'react-router-dom'

import { Button, Col, Row } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ProposalList from './proposalList'

import configs from 'app/configs'
import DaoDetails from '../dao/daoDetails'

const {
  manifest: { appId },
} = configs

const Proposal = () => {
  const history = useHistory()
  const { daoAddress } = useParams<{ daoAddress: string }>()

  return (
    <Row gutter={[24, 24]} align="middle">
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
      <Col>
        <Button
          type="primary"
          onClick={() =>
            history.push(`/app/${appId}/dao/${daoAddress}/new-proposal`)
          }
        >
          New Proposal
        </Button>
      </Col>
      <Col span={24}>
        <ProposalList daoAddress={daoAddress} />
      </Col>
    </Row>
  )
}

export default Proposal
