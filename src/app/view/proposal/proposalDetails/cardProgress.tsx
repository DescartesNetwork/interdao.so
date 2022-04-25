import { useSelector } from 'react-redux'
import { DaoData } from '@interdao/core'
import { utils } from '@senswap/sen-js'

import { Card, Col, Row, Space, Typography, Progress } from 'antd'

import { ProposalChildCardProps } from './index'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import useProposal from 'app/hooks/useProposal'
import { AppState } from 'app/model'
import { numeric } from 'shared/util'
import useReceipts from 'app/hooks/useReceipts'

const CardProgress = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  const {
    dao: { daoData },
  } = useSelector((state: AppState) => state)
  const { votingAgainstPower, votingForPower, supply } = useProposal(
    proposalAddress,
    daoAddress,
  )
  const { receipts } = useReceipts({ proposalAddress })
  const { mint } = daoData[daoAddress] || ({} as DaoData)
  const mintDecimal = useMintDecimals(mint?.toBase58()) || 0

  const totalPower = Number(supply) / 10 ** mintDecimal
  const votingFor = Number(votingForPower) || 0
  const votingAgainst = Number(votingAgainstPower) || 0
  const parseVotingFor = Number(
    utils.undecimalize(BigInt(votingFor), mintDecimal),
  )
  const parseVotingAgainst = Number(
    utils.undecimalize(BigInt(votingAgainst), mintDecimal),
  )
  const percentageVotingFor = totalPower > 0 ? parseVotingFor / totalPower : 0
  const percentageVotingAgainst =
    totalPower > 0 ? parseVotingAgainst / totalPower : 0
  const voteResult =
    percentageVotingFor > percentageVotingAgainst
      ? percentageVotingFor - percentageVotingAgainst
      : 0

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5}>Current results</Typography.Title>
        </Col>
        <Col span={24}>
          <Space size={0} style={{ width: '100%' }} direction="vertical">
            <Typography.Text type="secondary">Quorum</Typography.Text>
            <Typography.Text>
              {receipts?.length} more votes required
            </Typography.Text>
            <Progress
              percent={100}
              strokeColor="#d3d3d6"
              success={{ percent: voteResult * 100, strokeColor: '#F9575E' }}
              showInfo={false}
            />
          </Space>
        </Col>
        <Col span={24}>
          <Space className="space-full-width">
            <Row gutter={[0, 0]}>
              <Col flex="auto">
                <Typography.Text type="secondary">Yes vote</Typography.Text>
              </Col>
              <Col>
                <Space>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    {numeric(percentageVotingFor).format('0,0.[00]%')}
                  </Typography.Text>
                  <Typography.Title level={5}>
                    {numeric(totalPower).format('0,0.[000]')}
                  </Typography.Title>
                </Space>
              </Col>
              <Col span={24}>
                <Progress
                  percent={100}
                  strokeColor="#d3d3d6"
                  success={{
                    percent: percentageVotingFor * 100,
                    strokeColor: '#F9575E',
                  }}
                  showInfo={false}
                />
              </Col>
            </Row>
          </Space>
        </Col>
        <Col span={24}>
          <Space className="space-full-width">
            <Row gutter={[0, 0]}>
              <Col flex="auto">
                <Typography.Text type="secondary">No vote</Typography.Text>
              </Col>
              <Col>
                <Space>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    {numeric(percentageVotingAgainst).format('0,0.[00]%')}
                  </Typography.Text>
                  <Typography.Title level={5}>
                    {numeric(totalPower).format('0,0.[000]')}
                  </Typography.Title>
                </Space>
              </Col>
              <Col span={24}>
                <Progress
                  percent={100}
                  strokeColor="#d3d3d6"
                  success={{
                    percent: percentageVotingAgainst * 100,
                    strokeColor: '#F9575E',
                  }}
                  showInfo={false}
                />
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default CardProgress
