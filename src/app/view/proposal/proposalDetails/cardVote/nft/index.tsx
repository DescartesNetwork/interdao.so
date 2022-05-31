import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { DaoData } from '@interdao/core'

import { Button, Card, Col, Row, Typography, Space, Tooltip } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ModalVoteNFT from './modalVoteNFT'
import Withdraw from '../../withdraw'

import useProposal from 'app/hooks/useProposal'
import { AppState } from 'app/model'
import { ProposalChildCardProps } from '../../index'
import { numeric } from 'shared/util'
import useProposalStatus from 'app/hooks/useProposalStatus'
import { getRemainingTime } from 'app/helpers/countDown'

const defaultRemainingTime = {
  minutes: '00',
  hours: '00',
  days: '00',
  seconds: '00',
}

type LockedVotingProps = {
  proposalAddress: string
  daoAddress: string
}

export enum VotingType {
  Agree = 'Agree',
  Disagree = 'Disagree',
}

const LockedVoting = ({ proposalAddress, daoAddress }: LockedVotingProps) => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime)

  const { status } = useProposalStatus(proposalAddress)
  const {
    voteBid: { amount: voteAmount },
  } = useSelector((state: AppState) => state)
  const { consensusMechanism, endDate, startDate } = useProposal(
    proposalAddress,
    daoAddress,
  )

  const voteNow = new Date().getTime()
  const endTime = Number(endDate) * 1000
  const startTime = Number(startDate) * 1000

  const isLockedVote =
    Object.keys(consensusMechanism || [])?.[0] === 'lockedTokenCounter'
  const remaining = voteNow < endTime ? endTime - voteNow : 0
  const votePower = (Number(voteAmount) * remaining) / 1000

  const updateRemainingTime = useCallback(
    (countdown: number, startTime?: number) => {
      setRemainingTime(getRemainingTime(countdown, startTime))
    },
    [],
  )

  useEffect(() => {
    if (status === 'Preparing') return updateRemainingTime(endTime, startTime)
    const intervalId = setInterval(() => {
      updateRemainingTime(endTime)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [endTime, startTime, status, updateRemainingTime])

  if (!isLockedVote) return <Fragment />

  return (
    <Row gutter={[16, 16]}>
      <Col flex="auto">
        <Space direction="vertical">
          <Typography.Text>Time remaining</Typography.Text>
          <Typography.Title level={5}>
            {remainingTime.days}d : {remainingTime.hours}h :{' '}
            {remainingTime.minutes}m : {remainingTime.seconds}s
          </Typography.Title>
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Space>
            <Tooltip title="Your power will be equal to the token amount multiplied by the remaining time (by seconds)">
              <IonIcon
                style={{ cursor: 'pointer' }}
                name="information-circle-outline"
              />
            </Tooltip>
            <Typography.Text>Power of your votes</Typography.Text>
          </Space>

          <Typography.Title level={5} style={{ textAlign: 'right' }}>
            {numeric(votePower).format('0,0.[0000]')}
          </Typography.Title>
        </Space>
      </Col>
    </Row>
  )
}

const CardVoteByNFT = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  const [votingType, setVotingType] = useState<VotingType>(VotingType.Agree)
  const [visible, setVisible] = useState(false)
  const daoData = useSelector((state: AppState) => state.dao.daos)

  const { mint } = daoData[daoAddress] || ({} as DaoData)
  const { status } = useProposalStatus(proposalAddress)

  const disabled = useMemo(() => {
    return status !== 'Voting' || !account.isAddress(proposalAddress)
  }, [proposalAddress, status])

  const onVoteNftFor = () => {
    setVisible(true)
    setVotingType(VotingType.Agree)
  }

  const onVoteNftAgainst = () => {
    setVisible(true)
    setVotingType(VotingType.Disagree)
  }

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row>
            <Col flex="auto">
              <Typography.Title level={5}>Cast your votes</Typography.Title>
            </Col>
            <Col>
              <Withdraw
                daoAddress={daoAddress}
                proposalAddress={proposalAddress}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <LockedVoting
            proposalAddress={proposalAddress}
            daoAddress={daoAddress}
          />
        </Col>

        <Col span={24}>
          <Button
            onClick={onVoteNftFor}
            type="primary"
            disabled={disabled}
            block
            size="large"
            icon={<IonIcon name="thumbs-up-outline" />}
          >
            Agree
          </Button>
        </Col>
        <Col span={24}>
          <Button
            onClick={onVoteNftAgainst}
            type="primary"
            disabled={disabled}
            block
            size="large"
            icon={<IonIcon name="thumbs-down-outline" />}
          >
            Disagree
          </Button>
        </Col>
      </Row>
      <ModalVoteNFT
        visible={visible}
        setVisible={setVisible}
        collectionAddress={mint.toBase58()}
        votingType={votingType}
        proposalAddress={proposalAddress}
        daoAddress={daoAddress}
      />
    </Card>
  )
}
export default CardVoteByNFT
