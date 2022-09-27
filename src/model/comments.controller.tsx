import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { sha256 } from 'js-sha256'
import camelcase from 'camelcase'
import bs58 from 'bs58'

import { ipfs } from 'helpers/ipfs'

/**
 * Interface & Utility
 */

export enum VoteState {
  For = 'vote-for',
  Against = 'vote-against',
}

export type CommentProposal = {
  authority: string
  time: string
  content: string
  voteState?: VoteState
  receipt?: string
}

type ProposalAddress = string
type WalletAddress = string
export type CommentState = Record<
  ProposalAddress,
  Record<WalletAddress, CommentProposal[]>
>

/**
 * Store constructor
 */

const NAME = 'comment'
const initialState: CommentState = {}
/**
 * Actions
 */

export const deriveDiscriminator = (proposal: string) => {
  const key = `${proposal}`
  return Buffer.from(
    sha256.digest(`proposal:${camelcase(key, { pascalCase: true })}`),
  ).slice(0, 8)
}

export const getComments = createAsyncThunk(
  `${NAME}/getComments`,
  async (proposal: string) => {
    const discriminator = deriveDiscriminator(proposal)
    const contents = await window.interDao.program.account.content.all([
      { memcmp: { offset: 40, bytes: bs58.encode(discriminator) } },
    ])

    let bulk: Record<WalletAddress, CommentProposal[]> = {}
    await Promise.all(
      contents.map(async (content) => {
        const data = await ipfs.methods.proposalComments.get(
          content.account.metadata,
        )
        bulk[content.account.authority.toBase58()] = data
      }),
    )
    return {
      proposal,
      bulk,
    }
  },
)

export const upsetComment = createAsyncThunk(
  `${NAME}/upsetComment`,
  async ({
    proposal,
    wallet,
    metadata,
  }: {
    proposal: string
    wallet: string
    metadata: number[]
  }) => {
    let bulk: Record<WalletAddress, CommentProposal[]> = {}
    await ipfs.methods.proposalComments.get(metadata)
    return {
      proposal,
      bulk,
    }
  },
)

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(getComments.fulfilled, (state, { payload }) => {
        if (!state[payload.proposal]) state[payload.proposal] = {}
        Object.assign(state[payload.proposal], payload.bulk)
        return state
      })
      .addCase(upsetComment.fulfilled, (state, { payload }) => {
        Object.assign(state[payload.proposal], payload.bulk)
        return state
      }),
})

export default slice.reducer
