import { Fragment, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { utilsBN } from 'sentre-web3'
import { useGetMintDecimals } from '@sentre/senhub'

import { Button, Col, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { AppState } from 'model'
import { ProposalChildCardProps } from '../../index'
import useProposalStatus from 'hooks/proposal/useProposalStatus'
import useProposalFee from 'hooks/proposal/useProposalFee'
import { setVoteBidAmount } from 'model/voteBid.controller'
import { notifyError, notifySuccess } from 'helpers'
import { useAnchorProvider } from 'hooks/useAnchorProvider'
import { useCommentProposal } from 'hooks/useCommentProposal'
import { VoteState } from 'model/comments.controller'
import InputComment from 'components/inputComment'
import { useDaoData } from 'hooks/dao'

const ActionVote = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  const [voting, setVoting] = useState<VoteState>()
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const amount = useSelector((state: AppState) => state.voteBid.amount)
  const daoData = useDaoData(daoAddress)

  const getMintDecimals = useGetMintDecimals()
  const { status } = useProposalStatus(proposalAddress)
  const proposalFee = useProposalFee({ daoAddress })
  const { initTxCommentProposal } = useCommentProposal()
  const provider = useAnchorProvider()

  const disabled = useMemo(() => {
    if (!!voting) return true
    return status !== 'Voting' || !amount || !account.isAddress(proposalAddress)
  }, [amount, proposalAddress, status, voting])

  const getTxVote = async (voteType: VoteState) => {
    const decimals = await getMintDecimals({
      mintAddress: daoData?.mint.toBase58()!,
    })
    const amountBN = utilsBN.decimalize(amount, decimals!)
    switch (voteType) {
      case VoteState.For:
        return window.interDao.voteFor(
          proposalAddress,
          amountBN,
          proposalFee,
          false,
        )
      case VoteState.Against:
        return window.interDao.voteAgainst(
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

        <Col span={12}>
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
        <Col span={12}>
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
