import { useSelector } from 'react-redux'
import { ProposalData } from '@interdao/core'

import { Button, Card, Col, Row, Space, Typography } from 'antd'

import { AppState } from 'app/model'
import { numeric, shortenAddress } from 'shared/util'
import moment from 'moment'

export type ProposalCardProps = { proposalAddress: string }

const ProposalCard = ({ proposalAddress }: ProposalCardProps) => {
  const { proposal } = useSelector((state: AppState) => state)

  const {
    index,
    supply,
    startDate,
    endDate,
    votingForPower,
    votingAgainstPower,
    consensusMechanism,
    consensusQuorum,
  } = proposal[proposalAddress] || ({} as ProposalData)

  const totalPower = Number(supply)
  const voteForPercentage = Number(votingForPower) / totalPower
  const voteAgainstPercentage = Number(votingAgainstPower) / totalPower

  return (
    <Card>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <Space>
            <Typography.Text type="secondary">Proposal:</Typography.Text>
            <Typography.Text>{shortenAddress(proposalAddress)}</Typography.Text>
          </Space>
        </Col>
        <Col span={12}>
          <Space>
            <Typography.Text type="secondary">Proposal ID:</Typography.Text>
            <Typography.Text>{Number(index)}</Typography.Text>
          </Space>
        </Col>
        <Col span={12}>
          <Space>
            <Typography.Text type="secondary">Start:</Typography.Text>
            <Typography.Text>
              {moment(Number(startDate) * 1000).format('MMM Do YYYY, HH:mm')}
            </Typography.Text>
          </Space>
        </Col>
        <Col span={12}>
          <Space>
            <Typography.Text type="secondary">End:</Typography.Text>
            <Typography.Text>
              {moment(Number(endDate) * 1000).format('MMM Do YYYY, HH:mm')}
            </Typography.Text>
          </Space>
        </Col>
        <Col>
          <Space direction="vertical">
            <Typography.Text type="secondary">Mechanism</Typography.Text>
            <Typography.Text>
              {Object.keys(consensusMechanism)[0]}
            </Typography.Text>
          </Space>
        </Col>
        <Col>
          <Space direction="vertical">
            <Typography.Text type="secondary">Quorum</Typography.Text>
            <Typography.Text>{Object.keys(consensusQuorum)[0]}</Typography.Text>
          </Space>
        </Col>
        <Col>
          <Space direction="vertical">
            <Typography.Text type="secondary">Vote For</Typography.Text>
            <Typography.Text>
              {numeric(voteForPercentage).format('%')}
            </Typography.Text>
          </Space>
        </Col>
        <Col>
          <Space direction="vertical">
            <Typography.Text type="secondary">Vote Against</Typography.Text>
            <Typography.Text>
              {numeric(voteAgainstPercentage).format('%')}
            </Typography.Text>
          </Space>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Button onClick={() => {}} block>
                Vote Against
              </Button>
            </Col>
            <Col span={12}>
              <Button type="primary" onClick={() => {}} block>
                Vote For
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default ProposalCard
