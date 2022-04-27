import { Fragment, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account, utils } from '@senswap/sen-js'
import moment from 'moment'
import { DaoData } from '@interdao/core'
import { BN } from 'bn.js'

import { Button, Card, Col, Row, Typography, Space } from 'antd'
import NumericInput from 'shared/antd/numericInput'

import useProposal from 'app/hooks/useProposal'
import { AppState } from 'app/model'
import { setVoteBidAmount } from 'app/model/voteBid.controller'
import { ProposalChildCardProps } from './index'
import { explorer, numeric } from 'shared/util'
import configs from 'app/configs'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import IonIcon from 'shared/antd/ionicon'
import { MintSymbol } from 'shared/antd/mint'

const {
  sol: { interDao },
} = configs

type LockedVotingProps = {
  proposalAddress: string
  daoAddress: string
}
const LockedVoting = ({ proposalAddress, daoAddress }: LockedVotingProps) => {
  const {
    voteBid: { amount: voteAmount },
  } = useSelector((state: AppState) => state)
  const { consensusMechanism, endDate } = useProposal(
    proposalAddress,
    daoAddress,
  )

  const voteNow = new Date().getTime()
  const endTime = Number(endDate) * 1000
  const isLockedVote =
    Object.keys(consensusMechanism || [])?.[0] === 'lockedTokenCounter'
  const remaining = voteNow < endTime ? endTime - voteNow : 0
  const votePower = (Number(voteAmount) * remaining) / 1000

  if (!isLockedVote) return <Fragment />

  return (
    <Row gutter={[16, 16]}>
      <Col flex="auto">
        <Space direction="vertical">
          <Typography.Text>Time remaining</Typography.Text>
          <Typography.Title level={5}>
            {moment(endTime).endOf('day').fromNow()}
          </Typography.Title>
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text>Power of your vote</Typography.Text>
          <Typography.Title level={5} style={{ textAlign: 'right' }}>
            {numeric(votePower).format('0,0.[0000]')}
          </Typography.Title>
        </Space>
      </Col>
    </Row>
  )
}

const CardVote = ({ proposalAddress, daoAddress }: ProposalChildCardProps) => {
  const [loadingFor, setLoadingFor] = useState(false)
  const [loadingAgainst, setLoadingAgainst] = useState(false)
  const {
    dao: { daoData },
    voteBid: { amount },
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch()
  const { mint } = daoData[daoAddress] || ({} as DaoData)
  const { balance, decimals } = useAccountBalanceByMintAddress(mint?.toBase58())

  const onChange = useCallback(
    (value: string) => {
      if (!decimals) return
      dispatch(setVoteBidAmount(value))
    },
    [dispatch, decimals],
  )

  const onVoteFor = useCallback(async () => {
    setLoadingFor(true)
    try {
      if (!amount || !account.isAddress(proposalAddress)) return
      const voteAmount = utils.decimalize(amount, decimals)
      const nextAmount = new BN(voteAmount.toString())
      const { txId } = await interDao.voteFor(proposalAddress, nextAmount)
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
  }, [amount, decimals, proposalAddress])

  const onVoteAgainst = useCallback(async () => {
    setLoadingAgainst(true)
    try {
      if (!amount || !account.isAddress(proposalAddress)) return
      const voteAmount = utils.decimalize(amount, decimals)
      const nextAmount = new BN(voteAmount.toString())
      const { txId } = await interDao.voteAgainst(proposalAddress, nextAmount)
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
      setLoadingAgainst(false)
    }
  }, [amount, decimals, proposalAddress])

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5}>Cast your vote</Typography.Title>
        </Col>
        <Col span={24}>
          <Card
            style={{
              boxShadow: 'unset',
              borderRadius: 4,
              background: '#1A1311',
            }}
            bodyStyle={{ padding: '8px 12px' }}
            bordered={false}
          >
            <Row gutter={[8, 8]}>
              <Col flex="auto">
                <Typography.Text>Amount vote</Typography.Text>
              </Col>
              <Col>
                <Typography.Text>
                  Available: {numeric(balance).format('0,0.[00]')}
                </Typography.Text>{' '}
                <MintSymbol mintAddress={mint?.toBase58()} />
              </Col>
              <Col span={24}>
                <NumericInput
                  bordered={false}
                  style={{ padding: 0 }}
                  placeholder="0"
                  value={amount}
                  onValue={onChange}
                  suffix={
                    <Typography.Text
                      style={{ cursor: 'pointer' }}
                      onClick={() => onChange(balance.toString())}
                    >
                      MAX
                    </Typography.Text>
                  }
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <LockedVoting
            proposalAddress={proposalAddress}
            daoAddress={daoAddress}
          />
        </Col>
        <Col span={12}>
          <Button
            onClick={onVoteAgainst}
            type="primary"
            disabled={!amount || !account.isAddress(proposalAddress)}
            loading={loadingFor}
            block
            size="large"
            icon={<IonIcon name="thumbs-down-outline" />}
          >
            Vote No
          </Button>
        </Col>
        <Col span={12}>
          <Button
            onClick={onVoteFor}
            type="primary"
            disabled={!amount || !account.isAddress(proposalAddress)}
            loading={loadingAgainst}
            block
            size="large"
            icon={<IonIcon name="thumbs-up-outline" />}
          >
            Vote Yes
          </Button>
        </Col>
      </Row>
    </Card>
  )
}
export default CardVote
