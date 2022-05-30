import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { DaoData, FeeOptions } from '@interdao/core'
import { BN } from 'bn.js'

import { Button, Card, Col, Row, Typography, Space, Tooltip } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import Withdraw from './withdraw'

import useProposal from 'app/hooks/useProposal'
import { AppState } from 'app/model'
import { ProposalChildCardProps } from './index'
import { explorer, numeric } from 'shared/util'
import configs from 'app/configs'
import useProposalStatus from 'app/hooks/useProposalStatus'
import { getRemainingTime } from 'app/helpers/countDown'
// import useMetaData from 'app/hooks/useMetaData'
import ModalVoteNFT from './modalVoteNFT'

const {
  sol: { interDao, taxman, fee },
} = configs

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
  const [loadingFor, setLoadingFor] = useState(false)
  // const [loadingAgainst, setLoadingAgainst] = useState(false)
  const [visible, setVisible] = useState(false)
  const daoData = useSelector((state: AppState) => state.dao.daos)

  const { regime, authority } = daoData[daoAddress] || ({} as DaoData)
  const { status } = useProposalStatus(proposalAddress)
  // const daoMetaData = useMetaData(daoAddress)

  const disabled = useMemo(() => {
    return status !== 'Voting' || !account.isAddress(proposalAddress)
  }, [proposalAddress, status])

  const parseRegime = useMemo(() => {
    if (!regime) return ''
    return Object.keys(regime)[0]
  }, [regime])

  const proposalFee = useMemo(() => {
    if (!parseRegime || !authority) return

    const feeOption: FeeOptions = {
      tax: new BN(fee),
      taxmanAddress: taxman,
      revenue: new BN(fee),
      revenuemanAddress: authority.toBase58(),
    }

    if (parseRegime === 'democratic')
      return {
        tax: new BN(0),
        taxmanAddress: taxman,
        revenue: new BN(0),
        revenuemanAddress: authority.toBase58(),
      }

    return feeOption
  }, [authority, parseRegime])

  const onVoteNftFor = useCallback(async () => {
    setVisible(true)
    setLoadingFor(true)
    try {
      if (!account.isAddress(proposalAddress)) return
      const nftMintAddress = ''
      const { txId, receiptAddress } = await interDao.voteNftFor(
        proposalAddress,
        nftMintAddress,
        proposalFee,
      )
      console.log(receiptAddress)
      window.notify({
        type: 'success',
        description: 'Voted successfully. Click to view details!',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
    } catch (error: any) {
      window.notify({
        type: 'error',
        description: error.message,
      })
    } finally {
      setLoadingFor(false)
    }
  }, [proposalAddress, proposalFee])

  const onVoteNftAgainst = useCallback(async () => {}, [])

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
            loading={loadingFor}
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
            // loading={loadingAgainst}
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
        collectionAddress={'HgzRcYdx9GnJcXUBrPEiVxdTMk6LtbZZYHb9hAZ2GnMJ'}
      />
    </Card>
  )
}
export default CardVoteByNFT
