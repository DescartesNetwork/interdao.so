import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account, utils } from '@senswap/sen-js'
import { DaoData } from '@interdao/core'
import { BN } from 'bn.js'

import { Button, Card, Col, Row, Typography } from 'antd'
import NumericInput from 'shared/antd/numericInput'
import IonIcon from 'shared/antd/ionicon'
import Withdraw from '../../withdraw'
import LockedVoting from '../lockedVoting'

import { AppState } from 'app/model'
import { setVoteBidAmount } from 'app/model/voteBid.controller'
import { ProposalChildCardProps } from '../../index'
import { explorer, numeric } from 'shared/util'
import configs from 'app/configs'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import { MintSymbol } from 'shared/antd/mint'
import useProposalStatus from 'app/hooks/proposal/useProposalStatus'
import useMetaData from 'app/hooks/useMetaData'
import useProposalFee from 'app/hooks/proposal/useProposalFee'

const {
  sol: { interDao },
} = configs

const DEFAULT_VALUE_VOTE_MULTISIG = 1

const CardVoteToken = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  const [loadingFor, setLoadingFor] = useState(false)
  const [loadingAgainst, setLoadingAgainst] = useState(false)
  const {
    dao: { daos },
    voteBid: { amount },
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch()
  const { mint } = daos[daoAddress] || ({} as DaoData)
  const { balance, decimals } = useAccountBalanceByMintAddress(mint?.toBase58())
  const { status } = useProposalStatus(proposalAddress)
  const daoMetaData = useMetaData(daoAddress)
  const proposalFee = useProposalFee({ daoAddress })
  const isMultisigDAO = daoMetaData?.daoType === 'multisig-dao'

  const disabled = useMemo(() => {
    if (isMultisigDAO) return status !== 'Voting' || balance <= 0

    return status !== 'Voting' || !amount || !account.isAddress(proposalAddress)
  }, [amount, balance, isMultisigDAO, proposalAddress, status])

  const onChange = (value: string) => {
    dispatch(setVoteBidAmount(value))
  }

  const onVoteFor = useCallback(async () => {
    setLoadingFor(true)
    try {
      if ((!amount || !account.isAddress(proposalAddress)) && !isMultisigDAO)
        return
      const actualAmount = isMultisigDAO ? DEFAULT_VALUE_VOTE_MULTISIG : amount
      const voteAmount = utils.decimalize(actualAmount, decimals)
      const nextAmount = new BN(voteAmount.toString())
      const { txId } = await interDao.voteFor(
        proposalAddress,
        nextAmount,
        proposalFee,
      )
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
  }, [amount, proposalAddress, isMultisigDAO, decimals, proposalFee])

  const onVoteAgainst = useCallback(async () => {
    setLoadingAgainst(true)
    try {
      if ((!amount || !account.isAddress(proposalAddress)) && !isMultisigDAO)
        return
      const actualAmount = isMultisigDAO ? DEFAULT_VALUE_VOTE_MULTISIG : amount
      const voteAmount = utils.decimalize(actualAmount, decimals)
      const nextAmount = new BN(voteAmount.toString())
      const { txId } = await interDao.voteAgainst(
        proposalAddress,
        nextAmount,
        proposalFee,
      )
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
  }, [amount, proposalAddress, isMultisigDAO, decimals, proposalFee])

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
        {!isMultisigDAO && (
          <Col span={24}>
            <Card
              className="numric-ip-card"
              bodyStyle={{ padding: '8px 12px' }}
              bordered={false}
            >
              <Row gutter={[8, 8]}>
                <Col flex="auto">
                  <Typography.Text>Amount votes</Typography.Text>
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
        )}
        <Col span={24}>
          <LockedVoting
            proposalAddress={proposalAddress}
            daoAddress={daoAddress}
          />
        </Col>
        <Col span={isMultisigDAO ? 24 : 12}>
          <Button
            onClick={onVoteFor}
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
        <Col span={isMultisigDAO ? 24 : 12}>
          <Button
            onClick={onVoteAgainst}
            type="primary"
            disabled={disabled}
            loading={loadingAgainst}
            block
            size="large"
            icon={<IonIcon name="thumbs-down-outline" />}
          >
            Disagree
          </Button>
        </Col>
      </Row>
    </Card>
  )
}
export default CardVoteToken
