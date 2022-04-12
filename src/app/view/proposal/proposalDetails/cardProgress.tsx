import { useSelector } from 'react-redux'
import { DaoData } from '@interdao/core'

import { Card, Col, Row, Space, Typography, Progress } from 'antd'

import { ProposalChildCardProps } from './index'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import useProposal from 'app/hooks/useProposal'
import { AppState } from 'app/model'
import { utils } from '@senswap/sen-js'

const QUORUM = {
  half: 1 / 2,
  oneThird: 1 / 3,
  twoThird: 2 / 3,
}

const CardProgress = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  const { dao } = useSelector((state: AppState) => state)
  const {
    dataLen,
    votingAgainstPower,
    votingForPower,
    supply,
    consensusQuorum,
    consensusMechanism,
  } = useProposal(proposalAddress, daoAddress)
  const { mint } = dao[daoAddress] || ({} as DaoData)
  const mintDecimal = useMintDecimals(mint?.toBase58()) || 0

  const totalPower = Number(supply)
  const votingFor = Number(votingForPower) || 0
  const votingAgainst = Number(votingAgainstPower) || 0
  const mechanismType = Object.keys(consensusMechanism || {})[0]
  const parseVotingFor = utils.undecimalize(BigInt(votingFor), mintDecimal)
  const parseVotingAgainst = utils.undecimalize(
    BigInt(votingAgainst),
    mintDecimal,
  )

  console.log(parseVotingAgainst, parseVotingFor, consensusMechanism, 2)

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
              {dataLen?.toNumber()} more votes required
            </Typography.Text>
            <Progress
              percent={100}
              strokeColor="#d3d3d6"
              success={{ percent: 60, strokeColor: '#F9575E' }}
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
                    55,07%
                  </Typography.Text>
                  <Typography.Title level={5}>102,161,162</Typography.Title>
                </Space>
              </Col>
              <Col span={24}>
                <Progress
                  percent={100}
                  strokeColor="#d3d3d6"
                  success={{ percent: 60, strokeColor: '#F9575E' }}
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
                    55,07%
                  </Typography.Text>
                  <Typography.Title level={5}>102,161,162</Typography.Title>
                </Space>
              </Col>
              <Col span={24}>
                <Progress
                  percent={100}
                  strokeColor="#d3d3d6"
                  success={{ percent: 60, strokeColor: '#F9575E' }}
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
