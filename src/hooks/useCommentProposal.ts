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
} from 'model/comment.controller'

const {
  sol: { interDao },
} = configs

const ipfs = new IPFS()

export const useCommentProposal = () => {
  const { wallet } = useWallet()

  const buildCommentData = (content: string): CommentProposal => {
    return {
      time: new Date().toUTCString(),
      content,
    }
  }

  const initTxCommentProposal = useCallback(
    async (proposal: string, content: string) => {
      const discriminator = deriveDiscriminator(proposal)
      const ipfsol = await deriveIpfsolAddress(discriminator, wallet.address)
      const newComment = buildCommentData(content)
      let comments: CommentProposal[] = []
      try {
        // fetch comments history
        const ipfsolData = await interDao.program.account.ipfsol.fetch(ipfsol)
        const cid = getCID(ipfsolData.cid)
        comments = (await ipfs.get<CommentProposal[]>(cid)) || []
      } catch (error) {}
      comments.push(newComment)

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
    [wallet.address],
  )

  return { initTxCommentProposal }
}
