import { useCallback, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ConsensusMechanisms, ConsensusQuorums } from '@interdao/core'

import { Button, Card, Col, Divider, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ConsensusMechanismInput from './consensusMechanismInput'
import ConsensusQuorumInput from './consensusQuorumInput'
import DurationInput from './durationInput'

import configs from 'app/configs'
import ProposalPreview from './proposalPreview'

const {
  manifest: { appId },
} = configs
const CURRENT_TIME = Number(new Date())
const ONE_DAY = 24 * 60 * 60 * 1000

const ProposalInitialization = () => {
  const [consensusMechanism, setConsensusMechanism] = useState(
    ConsensusMechanisms.StakedTokenCounter,
  )
  const [consensusQuorum, setConsensusQuorum] = useState(ConsensusQuorums.Half)
  const [duration, setDuration] = useState([
    CURRENT_TIME + ONE_DAY,
    CURRENT_TIME + 15 * ONE_DAY,
  ])
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { daoAddress } = useParams<{ daoAddress: string }>()

  const newProposal = useCallback(() => {
    try {
      setLoading(true)
      console.log(daoAddress, consensusMechanism, consensusQuorum, duration)
    } catch (er: any) {
      return window.notify({
        type: 'error',
        description: er.message,
      })
    } finally {
      return setLoading(false)
    }
  }, [daoAddress, consensusMechanism, consensusQuorum, duration])

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} md={16}>
        <Card bordered={false}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Typography.Title level={3}>
                New Proposal Information
              </Typography.Title>
            </Col>
            <Col span={24} />
            <Col span={24}>
              <ProposalPreview daoAddress={daoAddress} />
            </Col>
            <Col span={24}>
              <DurationInput value={duration} onChange={setDuration} />
            </Col>
            <Col span={24}>
              <ConsensusMechanismInput
                value={consensusMechanism}
                onChange={setConsensusMechanism}
              />
            </Col>
            <Col span={24}>
              <ConsensusQuorumInput
                value={consensusQuorum}
                onChange={setConsensusQuorum}
              />
            </Col>
            <Col span={24}>
              <Divider style={{ margin: 0 }} />
            </Col>
            <Col span={24} />
            <Col flex="auto">
              <Button
                type="text"
                icon={<IonIcon name="trash-outline" />}
                onClick={() => history.push(`/app/${appId}/dao/${daoAddress}`)}
                size="large"
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                onClick={newProposal}
                loading={loading}
                type="primary"
                size="large"
                icon={<IonIcon name="add-outline" />}
              >
                Create the Proposal
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default ProposalInitialization
