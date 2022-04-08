import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ProposalData } from '@interdao/core'
import { utils } from '@senswap/sen-js'

import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Typography,
  Progress,
  Tooltip,
} from 'antd'

import { AppState } from 'app/model'
import { numeric, shortenAddress } from 'shared/util'
import moment from 'moment'
import MechanismTag from 'app/components/mechanismTag'
import IonIcon from 'shared/antd/ionicon'

import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

export type ProposalCardProps = { proposalAddress: string }
type ConsensusQuarumType = 'oneThird' | 'half' | 'twoThird'

const PROPOSAL_QUORUM = {
  oneThird: 1 / 3,
  half: 1 / 2,
  twoThird: 2 / 3,
}

const ProposalCard = ({ proposalAddress }: ProposalCardProps) => {
  const { proposal } = useSelector((state: AppState) => state)
  const history = useHistory()

  const {
    // index,
    supply,
    // startDate,
    endDate,
    votingForPower,
    votingAgainstPower,
    // consensusMechanism,
    consensusQuorum,
    dao,
  } = proposal[proposalAddress] || ({} as ProposalData)

  const daoAddress = dao.toBase58()
  const totalPower = Number(supply)
  const voteForPower = Number(votingForPower)
  const voteAgainstPower = Number(votingAgainstPower)
  const totalVote = Number(votingForPower) + Number(votingAgainstPower)
  const voteForPercentage = totalVote ? (voteForPower / totalVote) * 100 : 0
  const voteAgainstPercentage = totalVote
    ? (voteAgainstPower / totalVote) * 100
    : 0
  const quorum = Object.keys(consensusQuorum)[0] as ConsensusQuarumType

  return (
    <Card>
      <Row gutter={[24, 24]}>
        {/* Voting status */}
        <Col span={24}>
          <Row gutter={[16, 16]} justify="space-between">
            <Col>
              <Space size={24} align="end">
                <MechanismTag tag={'Voting'} />
                <Typography.Text>
                  End date:
                  {moment(Number(endDate) * 1000).format('MMM Do YYYY, HH:mm')}
                </Typography.Text>
              </Space>
            </Col>
            <Col>
              <Button
                type="text"
                icon={<IonIcon name="chevron-forward-outline" />}
                onClick={() =>
                  history.push(
                    `/app/${appId}/dao/${daoAddress}/proposal/${proposalAddress}`,
                  )
                }
              />
            </Col>
          </Row>
        </Col>
        {/* Details */}
        <Col span={24}>
          <Row gutter={[16, 16]} justify="space-between">
            <Col>
              <Space direction="vertical" size={0}>
                <Typography.Title level={3}>
                  {shortenAddress(daoAddress, 8)}
                </Typography.Title>
                <Typography.Text style={{ fontSize: 16 }} type="secondary">
                  Forum post:
                  https://forum.mango.markets/t/grant-for-mango-sharp/470
                </Typography.Text>
              </Space>
            </Col>
            <Col>
              <Button size="large" type="primary" disabled>
                Execute
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col flex="auto">
              <Space direction="vertical" size={4}>
                <Typography.Title level={4}>Vote For</Typography.Title>
                <Space>
                  <Typography.Title level={4}>
                    {utils.undecimalize(BigInt(voteForPower), 9)}
                  </Typography.Title>
                  <Typography.Text className="caption" type="secondary">
                    {numeric(voteForPercentage).format('0,0.[00]')}%
                  </Typography.Text>
                </Space>
              </Space>
            </Col>
            <Col>
              <Space direction="vertical" size={4}>
                <Typography.Title level={4}>Vote Against</Typography.Title>
                <Space>
                  <Typography.Title level={4}>
                    {utils.undecimalize(BigInt(voteForPower), 9)}
                  </Typography.Title>
                  <Typography.Text className="caption" type="secondary">
                    {numeric(voteAgainstPercentage).format('0,0.[00]')}%
                  </Typography.Text>
                </Space>
              </Space>
            </Col>
            <Col span={24}>
              <Progress
                percent={100}
                strokeColor={!voteForPercentage ? '#dadada' : '#F9575E'}
                showInfo={false}
                success={{ percent: voteForPercentage, strokeColor: '#63E0B3' }}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Space direction="vertical" size={4}>
                <Space>
                  <Typography.Title level={4}>Approval Quorum</Typography.Title>
                  <Tooltip title="Approval quarum" arrowPointAtCenter>
                    <IonIcon name="information-circle-outline" />
                  </Tooltip>
                </Space>
                <Typography.Title level={4}>
                  {utils.undecimalize(BigInt(voteForPower), 9)} power vote For
                  required
                </Typography.Title>
              </Space>
            </Col>
            <Col span={24}>
              <Progress
                percent={100}
                strokeColor={!voteForPower ? '#dadada' : '#F9575E'}
                showInfo={false}
                success={{
                  percent:
                    voteForPower /
                    (totalPower * Number(PROPOSAL_QUORUM[quorum])),
                  strokeColor: '#63E0B3',
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default ProposalCard
