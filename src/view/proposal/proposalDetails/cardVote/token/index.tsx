import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DaoData } from '@interdao/core'
import { util } from '@sentre/senhub'

import { Card, Col, Row, Typography } from 'antd'
import NumericInput from 'shared/antd/numericInput'
import Withdraw from '../../withdraw'
import LockedVoting from '../lockedVoting'
import ActionVote from './actionVote'

import { AppState } from 'model'
import { setVoteBidAmount } from 'model/voteBid.controller'
import { ProposalChildCardProps } from '../../index'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import { MintSymbol } from 'shared/antd/mint'
import useProposalStatus from 'hooks/proposal/useProposalStatus'
import useMetaData from 'hooks/useMetaData'
import useProposal from 'hooks/proposal/useProposal'

const CardVoteToken = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  const daos = useSelector((state: AppState) => state.daos)
  const amount = useSelector((state: AppState) => state.voteBid.amount)
  const dispatch = useDispatch()
  const { mint } = daos[daoAddress] || ({} as DaoData)
  const { balance } = useAccountBalanceByMintAddress(mint?.toBase58())
  const { status } = useProposalStatus(proposalAddress)
  const { metaData: daoMetaData } = useMetaData(daoAddress)
  const { consensusMechanism } = useProposal(proposalAddress)
  const isMultisigDAO = daoMetaData?.daoType === 'multisig-dao'
  const isLockedVote =
    Object.keys(consensusMechanism || [])[0] === 'lockedTokenCounter'
  const isComplete = useMemo(() => {
    if (status === 'Preparing' || status === 'Voting') return false
    return true
  }, [status])

  const onChange = (value: string) => {
    dispatch(setVoteBidAmount(value))
  }

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5}>Cast Your Votes</Typography.Title>
        </Col>
        {!isMultisigDAO && !isComplete && (
          <Col span={24}>
            <Card
              className="numric-ip-card"
              bodyStyle={{ padding: '8px 12px' }}
              bordered={false}
            >
              <Row gutter={[8, 8]}>
                <Col flex="auto">
                  <Typography.Text>Amount Votes</Typography.Text>
                </Col>
                <Col>
                  <Typography.Text>
                    Available: {util.numeric(balance).format('0,0.[00]')}
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

        {isLockedVote && (
          <Col span={24}>
            <LockedVoting
              proposalAddress={proposalAddress}
              daoAddress={daoAddress}
            />
          </Col>
        )}
        <Col span={24}>
          {!isComplete ? (
            <ActionVote
              proposalAddress={proposalAddress}
              daoAddress={daoAddress}
            />
          ) : (
            <Withdraw
              proposalAddress={proposalAddress}
              daoAddress={daoAddress}
            />
          )}
        </Col>
      </Row>
    </Card>
  )
}
export default CardVoteToken
