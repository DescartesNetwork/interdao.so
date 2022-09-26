import { useCallback } from 'react'

import { CID } from 'ipfs-core'

import { useWalletAddress } from '@sentre/senhub'

import { getCID } from 'helpers'
import IPFS from 'helpers/ipfs'
import {
  CommentProposal,
  deriveDiscriminator,
  VoteState,
} from 'model/comments.controller'
import { web3 } from '@project-serum/anchor'

const ipfs = new IPFS()

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
      const metadata = getCID(contentData.metadata)
      ownerComments = [...(await ipfs.get<CommentProposal[]>(metadata))]
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
      const newCid = await ipfs.set(comments)
      const {
        multihash: { digest },
      } = CID.parse(newCid)

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
