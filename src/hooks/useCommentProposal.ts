import { useCallback } from 'react'
import { web3 } from '@project-serum/anchor'
import { useWalletAddress } from '@sentre/senhub'

import {
  CommentProposal,
  deriveDiscriminator,
  VoteState,
} from 'model/comments.controller'
import { ipfs } from 'helpers/ipfs'

export const useCommentProposal = () => {
  const walletAddress = useWalletAddress()
  const buildCommentData = useCallback(
    (
      content: string,
      voteState?: VoteState,
      receipt?: string,
    ): CommentProposal => {
      return {
        authority: walletAddress,
        voteState,
        receipt,
        time: new Date().toUTCString(),
        content,
      }
    },
    [walletAddress],
  )

  const addNewComment = async (
    contentId: web3.PublicKey,
    newComment: CommentProposal,
  ) => {
    let ownerComments: CommentProposal[] = []
    try {
      const contentData = await window.interDao.program.account.content.fetch(
        contentId,
      )
      ownerComments = [
        ...(await ipfs.methods.proposalComments.get(contentData.metadata)),
      ]
    } catch (error) {}
    ownerComments.push(newComment)
    return ownerComments
  }

  const initTxCommentProposal = useCallback(
    async (params: {
      proposal: string
      content: string
      voteState?: VoteState
      receipt?: string
    }) => {
      const { proposal, content, voteState, receipt } = params
      const discriminator = deriveDiscriminator(proposal)
      const contentId = await window.interDao.deriveContentAddress(
        discriminator,
      )
      const newComment = buildCommentData(content, voteState, receipt)
      const comments = await addNewComment(contentId, newComment)
      // Override new Cid
      const { digest } = await ipfs.methods.proposalComments.set(comments)
      const { tx } = await window.interDao.initializeContent(
        discriminator,
        digest,
        false,
      )
      return tx
    },
    [buildCommentData],
  )

  return { initTxCommentProposal }
}
