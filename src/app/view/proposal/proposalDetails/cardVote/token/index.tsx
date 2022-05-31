import { useDispatch, useSelector } from 'react-redux'
import { DaoData } from '@interdao/core'

import { Card, Col, Row, Typography } from 'antd'
import NumericInput from 'shared/antd/numericInput'
import Withdraw from '../../withdraw'
import LockedVoting from '../lockedVoting'

import { AppState } from 'app/model'
import { setVoteBidAmount } from 'app/model/voteBid.controller'
import { ProposalChildCardProps } from '../../index'
import { numeric } from 'shared/util'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import { MintSymbol } from 'shared/antd/mint'
import useProposalStatus from 'app/hooks/proposal/useProposalStatus'
import useMetaData from 'app/hooks/useMetaData'
import ActionVote from './actionVote'
import { useMemo } from 'react'

const CardVoteToken = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  const {
    dao: { daos },
    voteBid: { amount },
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch()
  const { mint } = daos[daoAddress] || ({} as DaoData)
  const { balance } = useAccountBalanceByMintAddress(mint?.toBase58())
  const { status } = useProposalStatus(proposalAddress)
  const daoMetaData = useMetaData(daoAddress)
  const isMultisigDAO = daoMetaData?.daoType === 'multisig-dao'

  const canWithdraw = useMemo(() => {
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
          <Typography.Title level={5}>Cast your votes</Typography.Title>
        </Col>
        {!isMultisigDAO && !canWithdraw && (
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
        <Col span={24}>
          {!canWithdraw ? (
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
