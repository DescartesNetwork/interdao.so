import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { DaoData } from '@interdao/core'
import { utils } from '@senswap/sen-js'

import { Card, Col, Row, Space, Typography, Progress } from 'antd'

import { ProposalChildCardProps } from './index'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import useProposal from 'app/hooks/useProposal'
import { AppState } from 'app/model'
import { numeric } from 'shared/util'
import useProposalStatus from 'app/hooks/useProposalStatus'
import { useUI } from '@senhub/providers'

const STROKE_COLOR = {
  dark: { default: '#312B29', success: '#698033' },
  light: { default: '#F2EFE9', success: '#F9DEB0' },
}

const CardProgress = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  const {
    dao: { daoData },
  } = useSelector((state: AppState) => state)
  const { votingAgainstPower, votingForPower, consensusQuorum } = useProposal(
    proposalAddress,
    daoAddress,
  )
  const { mint } = daoData[daoAddress] || ({} as DaoData)
  const mintDecimal = useMintDecimals(mint?.toBase58()) || 0
  const { actualSupply } = useProposalStatus(proposalAddress)
  const {
    ui: { theme },
  } = useUI()

  const noVote = Number(votingAgainstPower) || 0
  const yesVote = Number(votingForPower) || 0
  const totalVote = yesVote + noVote
  const percentYes = (yesVote / totalVote) * 100
  const percentNo = (noVote / totalVote) * 100

  const currentPower = useMemo(() => {
    if (!consensusQuorum) return 0
    const actualYesVote = yesVote - noVote
    const mechanismQuorum = Object.keys(consensusQuorum)[0]

    if (mechanismQuorum === 'half')
      return ((2 * actualYesVote) / actualSupply) * 100

    if (mechanismQuorum === 'oneThird')
      return ((3 * actualYesVote) / actualSupply) * 100

    if (mechanismQuorum === 'twoThird')
      return ((3 * actualYesVote) / (2 * actualSupply)) * 100
    return 0
  }, [actualSupply, consensusQuorum, noVote, yesVote])

  const powerRequire = useMemo(() => {
    if (!consensusQuorum || !actualSupply || currentPower >= 100) return 0
    const actualYesVote = yesVote - noVote
    const mechanismQuorum = Object.keys(consensusQuorum)[0]

    if (mechanismQuorum === 'half') return actualSupply / 2 - actualYesVote

    if (mechanismQuorum === 'oneThird') return actualSupply / 3 - actualYesVote

    if (mechanismQuorum === 'twoThird')
      return (2 * actualSupply) / 3 - actualYesVote
    return 0
  }, [actualSupply, consensusQuorum, currentPower, noVote, yesVote])

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
              {numeric(
                utils.undecimalize(BigInt(powerRequire), mintDecimal),
              ).format('0,0')}{' '}
              more Yes votes required
            </Typography.Text>
            <Progress
              percent={100}
              strokeColor={STROKE_COLOR[theme].default}
              success={{
                percent: currentPower,
                strokeColor: STROKE_COLOR[theme].success,
              }}
              showInfo={false}
            />
          </Space>
        </Col>
        <Col span={24}>
          <Space className="space-full-width">
            <Row gutter={[4, 4]}>
              <Col flex="auto">
                <Typography.Text type="secondary">Yes vote</Typography.Text>
              </Col>
              <Col>
                <Space>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    {numeric(percentYes).format('0,0.[00]')}%
                  </Typography.Text>
                  <Typography.Title level={5}>
                    {numeric(
                      utils.undecimalize(BigInt(yesVote), mintDecimal),
                    ).format('0,0.[0000]')}
                  </Typography.Title>
                </Space>
              </Col>
              <Col span={24}>
                <Progress
                  style={{ width: '100%' }}
                  percent={100}
                  strokeColor={STROKE_COLOR[theme].default}
                  success={{
                    percent: percentYes,
                    strokeColor: STROKE_COLOR[theme].success,
                  }}
                  showInfo={false}
                />
              </Col>
            </Row>
          </Space>
        </Col>
        <Col span={24}>
          <Space className="space-full-width">
            <Row gutter={[4, 4]}>
              <Col flex="auto">
                <Typography.Text type="secondary">No vote</Typography.Text>
              </Col>
              <Col>
                <Space>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    {numeric(percentNo).format('0,0.[00]')}%
                  </Typography.Text>
                  <Typography.Title level={5}>
                    {numeric(
                      utils.undecimalize(BigInt(noVote), mintDecimal),
                    ).format('0,0.[0000]')}
                  </Typography.Title>
                </Space>
              </Col>
              <Col span={24}>
                <Progress
                  percent={100}
                  strokeColor={STROKE_COLOR[theme].default}
                  success={{
                    percent: percentNo,
                    strokeColor: STROKE_COLOR[theme].success,
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
