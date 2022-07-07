import { useCallback } from 'react'

import { CID } from 'ipfs-core'

import { useWallet } from '@sentre/senhub'

import configs from 'configs'
import { getCID } from 'helpers'
import IPFS from 'helpers/ipfs'
import {
  CommentProposal,
  deriveDiscriminator,
  deriveIpfsolAddress,
  VoteState,
} from 'model/comments.controller'
import { web3 } from '@project-serum/anchor'

const {
  sol: { interDao },
} = configs

const ipfs = new IPFS()

export const useCommentProposal = () => {
  const { wallet } = useWallet()

  const buildCommentData = useCallback(
    (
      content: string,
      voteState?: VoteState,
      receipt?: string,
    ): CommentProposal => {
      return {
        authority: wallet.address,
        voteState,
        receipt,
        time: new Date().toUTCString(),
        content,
      }
    },
    [wallet.address],
  )

  const addNewComment = async (
    ipfsol: web3.PublicKey,
    newComment: CommentProposal,
  ) => {
    let ownerComments: CommentProposal[] = []
    try {
      const ipfsolData = await interDao.program.account.ipfsol.fetch(ipfsol)
      const cid = getCID(ipfsolData.cid)
      ownerComments = [...(await ipfs.get<CommentProposal[]>(cid))]
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
      const ipfsol = await deriveIpfsolAddress(discriminator, wallet.address)
      const newComment = buildCommentData(content, voteState, receipt)
      const comments = await addNewComment(ipfsol, newComment)
      // Override new Cid
      const newCid = await ipfs.set(comments)
      const {
        multihash: { digest },
      } = CID.parse(newCid)

      const { tx } = await interDao.initializeIpfsol(
        discriminator,
        digest,
        false,
      )
      return tx
    },
    [buildCommentData, wallet.address],
  )

  return { initTxCommentProposal }
}
