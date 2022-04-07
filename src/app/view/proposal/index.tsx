import { useHistory, useParams } from 'react-router-dom'

import { Button, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ProposalList from './proposalList'

import { shortenAddress } from 'shared/util'
import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

const Proposal = () => {
  const history = useHistory()
  const { daoAddress } = useParams<{ daoAddress: string }>()

  return (
    <Row gutter={[24, 24]} align="middle">
      <Col flex="auto">
        <Space>
          <Button
            icon={<IonIcon name="arrow-back-outline" />}
            type="text"
            onClick={() => history.push(`/app/${appId}/dao`)}
          />
          <Typography.Title level={3} type="secondary">
            DAO:
          </Typography.Title>
          <Typography.Title level={3}>
            {shortenAddress(daoAddress)}
          </Typography.Title>
        </Space>
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
