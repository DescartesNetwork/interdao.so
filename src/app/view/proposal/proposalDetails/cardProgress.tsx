import { useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { DaoData } from '@interdao/core'
import { utils } from '@senswap/sen-js'
import { useUI } from '@senhub/providers'
import BN from 'bn.js'

import { Card, Col, Row, Space, Typography, Progress } from 'antd'
import RowSpaceVertical from 'app/components/rowSpaceVertical'

import { ProposalChildCardProps } from './index'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { AppState } from 'app/model'
import { numeric } from 'shared/util'
import useProposalStatus from 'app/hooks/proposal/useProposalStatus'
import useProposal from 'app/hooks/proposal/useProposal'
import { STROKE_COLOR } from 'app/constant'

const CardProgress = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  const [backGroundColor, setBackGroundColor] = useState('')
  const [successColor, setSuccessColor] = useState('')
  const daos = useSelector((state: AppState) => state.daos)
  const { votingAgainstPower, votingForPower, consensusQuorum } =
    useProposal(proposalAddress)
  const { mint } = daos[daoAddress] || ({} as DaoData)
  const mintDecimal = useMintDecimals(mint?.toBase58()) || 0
  const { status, actualSupply } = useProposalStatus(proposalAddress)
  const {
    ui: { theme },
  } = useUI()

  const noVote = Number(votingAgainstPower) || 0
  const yesVote = Number(votingForPower) || 0
  const totalVote = yesVote + noVote
  const percentYes = (yesVote / totalVote) * 100
  const percentNo = (noVote / totalVote) * 100
  const defaultRequire = useMemo(
    () => new BN(utils.decimalize(1, mintDecimal).toString()),
    [mintDecimal],
  )

  const currentPower = useMemo(() => {
    if (!consensusQuorum) return new BN(0)
    const actualYesVote = votingForPower.sub(votingAgainstPower)
    const mechanismQuorum = Object.keys(consensusQuorum)[0]

    if (mechanismQuorum === 'half') {
      const supplyNeed = actualSupply.div(new BN(2)).add(defaultRequire)
      return actualYesVote.mul(new BN(100)).div(supplyNeed)
    }

    if (mechanismQuorum === 'oneThird') {
      const supplyNeed = actualSupply.div(new BN(3)).add(defaultRequire)
      return actualYesVote.mul(new BN(100)).div(supplyNeed)
    }

    if (mechanismQuorum === 'twoThird') {
      const supplyNeed = actualSupply
        .mul(new BN(2))
        .div(new BN(3))
        .add(defaultRequire)

      return actualYesVote.mul(new BN(100)).div(supplyNeed)
    }

    return new BN(0)
  }, [
    actualSupply,
    consensusQuorum,
    defaultRequire,
    votingAgainstPower,
    votingForPower,
  ])

  const powerRequire = useMemo(() => {
    if (!consensusQuorum || !actualSupply || currentPower.gte(new BN(100)))
      return new BN(0)
    const actualYesVote = votingForPower.sub(votingAgainstPower)
    const mechanismQuorum = Object.keys(consensusQuorum)[0]

    if (mechanismQuorum === 'half')
      return actualSupply.div(new BN(2)).sub(actualYesVote).add(defaultRequire)

    if (mechanismQuorum === 'oneThird')
      return actualSupply.div(new BN(3)).sub(actualYesVote).add(defaultRequire)

    if (mechanismQuorum === 'twoThird')
      return actualSupply
        .mul(new BN(2))
        .div(new BN(3))
        .add(defaultRequire)
        .sub(actualYesVote)

    return new BN(0)
  }, [
    actualSupply,
    consensusQuorum,
    currentPower,
    defaultRequire,
    votingAgainstPower,
    votingForPower,
  ])

  const percentSuccess = useMemo(() => {
    if (percentYes) return percentYes
    if (percentNo) return 100 - percentNo
    return 0
  }, [percentNo, percentYes])

  const getColors = useCallback(() => {
    if (!percentNo && !percentYes)
      return setBackGroundColor(STROKE_COLOR[theme].default)
    if (!percentNo && percentYes)
      return setSuccessColor(STROKE_COLOR[theme].for)
    if (percentNo && !percentYes)
      return setBackGroundColor(STROKE_COLOR[theme].against)

    setBackGroundColor(STROKE_COLOR[theme].against)
    return setSuccessColor(STROKE_COLOR[theme].for)
  }, [percentNo, percentYes, theme])

  const quorumText = useMemo(() => {
    switch (status) {
      case 'Failed':
        return 'The proposal has been failed'
      case 'Succeeded':
        return 'The proposal has been approved'
      default:
        return `${numeric(
          utils.undecimalize(BigInt(powerRequire.toString()), mintDecimal),
        ).format('0,0.[0000]')} more Vote For required`
    }
  }, [mintDecimal, powerRequire, status])

  useEffect(() => {
    getColors()
  }, [getColors])

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5}>Current results</Typography.Title>
        </Col>
        <Col span={24}>
          <Space size={0} style={{ width: '100%' }} direction="vertical">
            <Typography.Text type="secondary">Quorum</Typography.Text>
            <Typography.Text>{quorumText}</Typography.Text>
            <Progress
              percent={100}
              strokeColor={STROKE_COLOR[theme].default}
              success={{
                percent: currentPower.toNumber(),
                strokeColor: STROKE_COLOR[theme].for,
              }}
              showInfo={false}
            />
          </Space>
        </Col>
        <Col span={24}>
          <Row gutter={[4, 4]}>
            <Col flex="auto">
              <RowSpaceVertical
                label="Voted For"
                size={0}
                value={
                  <Typography.Title level={4}>
                    {numeric(
                      utils.undecimalize(BigInt(yesVote), mintDecimal),
                    ).format('0,0.[0000]')}
                  </Typography.Title>
                }
              />
            </Col>
            <Col>
              <RowSpaceVertical
                label="Voted Against"
                size={0}
                align="end"
                value={
                  <Typography.Title level={4}>
                    {numeric(
                      utils.undecimalize(BigInt(noVote), mintDecimal),
                    ).format('0,0.[0000]')}
                  </Typography.Title>
                }
              />
            </Col>
            <Col span={24}>
              <Progress
                style={{ width: '100%' }}
                percent={100}
                strokeColor={backGroundColor}
                success={{
                  percent: percentSuccess,
                  strokeColor: successColor,
                }}
                showInfo={false}
              />
            </Col>
            <Col span={24}>
              <Row>
                <Col flex="auto">
                  <Typography.Text type="secondary">
                    {numeric(percentYes).format('0,0.[00]')}%
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text type="secondary">
                    {numeric(percentNo).format('0,0.[00]')}%
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default CardProgress
