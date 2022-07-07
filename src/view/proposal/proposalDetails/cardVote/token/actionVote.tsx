import { Fragment, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { utilsBN } from 'sentre-web3'

import { Button, Col, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { AppState } from 'model'
import { ProposalChildCardProps } from '../../index'
import configs from 'configs'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import useProposalStatus from 'hooks/proposal/useProposalStatus'
import useMetaData from 'hooks/useMetaData'
import useProposalFee from 'hooks/proposal/useProposalFee'
import { setVoteBidAmount } from 'model/voteBid.controller'
import { notifyError, notifySuccess } from 'helpers'
import { useAnchorProvider } from 'hooks/useAnchorProvider'
import { useDaoData } from 'hooks/dao'
import { useCommentProposal } from 'hooks/useCommentProposal'
import { VoteState } from 'model/comments.controller'
import InputComment from 'components/inputComment'

const {
  sol: { interDao },
} = configs

const DEFAULT_VALUE_VOTE_MULTISIG = 1

const ActionVote = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  const [voting, setVoting] = useState<VoteState>()
  const [comment, setComment] = useState('')
  const amount = useSelector((state: AppState) => state.voteBid.amount)
  const dispatch = useDispatch()
  const daoData = useDaoData(daoAddress)
  const { metaData: daoMetaData } = useMetaData(daoAddress)
  const { balance, decimals } = useAccountBalanceByMintAddress(
    daoData?.mint?.toBase58() || '',
  )
  const { status } = useProposalStatus(proposalAddress)
  const proposalFee = useProposalFee({ daoAddress })
  const { initTxCommentProposal } = useCommentProposal()
  const provider = useAnchorProvider()

  const isMultisigDAO = daoMetaData?.daoType === 'multisig-dao'

  const disabled = useMemo(() => {
    if (!!voting) return true
    if (isMultisigDAO) return status !== 'Voting' || balance <= 0
    return status !== 'Voting' || !amount || !account.isAddress(proposalAddress)
  }, [amount, balance, isMultisigDAO, proposalAddress, status, voting])

  const getTxVote = async (voteType: VoteState) => {
    const rawAmount = isMultisigDAO ? DEFAULT_VALUE_VOTE_MULTISIG : amount
    const amountBN = utilsBN.decimalize(rawAmount, decimals)
    switch (voteType) {
      case VoteState.For:
        return interDao.voteFor(proposalAddress, amountBN, proposalFee, false)
      case VoteState.Against:
        return interDao.voteAgainst(
          proposalAddress,
          amountBN,
          proposalFee,
          false,
        )
      default:
        throw new Error('Invalid vote type')
    }
  }

  const onVote = async (voteState: VoteState) => {
    setVoting(voteState)
    try {
      const { tx: txVote } = await getTxVote(voteState)
      if (comment) {
        const receipt = txVote.instructions[0].keys[7].pubkey.toString()
        const txComment = await initTxCommentProposal({
          proposal: proposalAddress,
          content: comment,
          voteState,
          receipt,
        })
        txVote.add(txComment)
      }
      const txId = await provider.sendAndConfirm(txVote)
      dispatch(setVoteBidAmount(''))
      setComment('')
      notifySuccess('Voted', txId)
    } catch (error) {
      notifyError(error)
    } finally {
      setVoting(undefined)
    }
  }

  return (
    <Fragment>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <InputComment value={comment} onChange={setComment} />
        </Col>

        <Col span={isMultisigDAO ? 24 : 12}>
          <Button
            onClick={() => onVote(VoteState.For)}
            type="primary"
            disabled={disabled}
            loading={voting === VoteState.For}
            block
            size="large"
            icon={<IonIcon name="thumbs-up-outline" />}
          >
            Vote For
          </Button>
        </Col>
        <Col span={isMultisigDAO ? 24 : 12}>
          <Button
            onClick={() => onVote(VoteState.Against)}
            type="primary"
            disabled={disabled}
            loading={voting === VoteState.Against}
            block
            size="large"
            icon={<IonIcon name="thumbs-down-outline" />}
          >
            Vote Against
          </Button>
        </Col>
      </Row>
    </Fragment>
  )
}

export default ActionVote
