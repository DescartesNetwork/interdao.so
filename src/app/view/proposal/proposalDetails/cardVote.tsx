import { Fragment, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account, utils } from '@senswap/sen-js'
import moment from 'moment'
import { DaoData } from '@interdao/core'
import { BN } from 'bn.js'

import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Input,
  Space,
  Radio,
  RadioChangeEvent,
} from 'antd'
import IonIcon from 'shared/antd/ionicon'

import useProposal from 'app/hooks/useProposal'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { AppState } from 'app/model'
import { setVoteBidAmount } from 'app/model/voteBid.controller'
import { ProposalChildCardProps } from './index'

import configs from 'app/configs'
import { explorer, numeric } from 'shared/util'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'

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
  const { dao } = useSelector((state: AppState) => state)
  const { mint } = dao[daoAddress] || ({} as DaoData)
  const mintDecimal = useMintDecimals(mint?.toBase58()) || 0

  const voteNow = new Date().getTime()
  const endTime = Number(endDate) * 1000
  const isLockedVote =
    Object.keys(consensusMechanism || [])?.[0] === 'lockedTokenCounter'
  const remaining = voteNow < endTime ? endTime - voteNow : 0
  const votePower =
    (Number(utils.undecimalize(voteAmount, mintDecimal)) * remaining) / 1000

  if (!isLockedVote) return <Fragment />

  return (
    <Row gutter={[16, 16]}>
      <Col flex="auto">
        <Space direction="vertical">
          <Typography.Text>Time remaining</Typography.Text>
          <Typography.Title level={5}>
            {moment(endTime || voteNow, 'YYYYMMDD').fromNow()}
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
  const [loading, setLoading] = useState(false)
  const [voteType, setVoteType] = useState('yes')
  const {
    dao,
    voteBid: { amount },
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch()
  const { mint } = dao[daoAddress] || ({} as DaoData)
  const { balance, decimals } = useAccountBalanceByMintAddress(mint?.toBase58())

  const onChange = useCallback(
    (value: string) => {
      if (!value || !decimals) return

      const voteAmount = utils.decimalize(value, decimals)
      dispatch(setVoteBidAmount(voteAmount))
    },
    [dispatch, decimals],
  )

  const onVoteFor = useCallback(async () => {
    setLoading(true)
    try {
      if (!amount || !account.isAddress(proposalAddress)) return
      const nextAmount = new BN(amount.toString())
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
      setLoading(false)
    }
  }, [amount, proposalAddress])

  const onVoteAgainst = useCallback(async () => {
    setLoading(true)
    try {
      if (!amount || !account.isAddress(proposalAddress)) return
      const nextAmount = new BN(amount.toString())
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
      setLoading(false)
    }
  }, [amount, proposalAddress])

  const onVote = useCallback(() => {
    if (voteType === 'yes') return onVoteFor()
    return onVoteAgainst()
  }, [onVoteAgainst, onVoteFor, voteType])

  const onChangeVoteType = (e: RadioChangeEvent) => {
    setVoteType(e.target.value)
  }

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5}>Cast your vote</Typography.Title>
        </Col>
        <Col span={24}>
          <Radio.Group
            defaultValue={voteType}
            onChange={onChangeVoteType}
            className="btn-radio-voting"
          >
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Radio.Button value="yes">
                  <Space>
                    <IonIcon name="thumbs-up-outline" />
                    Yes
                  </Space>
                </Radio.Button>
              </Col>
              <Col span={12}>
                <Radio.Button value="no">
                  <Space>
                    <IonIcon name="thumbs-down-outline" />
                    No
                  </Space>
                </Radio.Button>
              </Col>
            </Row>
          </Radio.Group>
        </Col>
        <Col span={24}>
          <Card
            style={{ boxShadow: 'unset', borderRadius: 8 }}
            bodyStyle={{ padding: 8 }}
          >
            <Row gutter={[8, 8]}>
              <Col flex="auto">
                <Typography.Text>Amount vote</Typography.Text>
              </Col>
              <Col>
                <Typography.Text>
                  Available: {numeric(balance).format('0,0.[00]')}
                </Typography.Text>
              </Col>
              <Col span={24}>
                <Input
                  bordered={false}
                  style={{ padding: 0 }}
                  placeholder="0"
                  onChange={(e) => onChange(e.target.value)}
                  suffix={
                    <Button
                      size="small"
                      type="text"
                      onClick={() => onChange(balance.toString())}
                    >
                      Max
                    </Button>
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
        <Col span={24}>
          <Button
            onClick={onVote}
            type="primary"
            disabled={!amount || !account.isAddress(proposalAddress)}
            loading={loading}
            block
          >
            Vote
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default CardVote
