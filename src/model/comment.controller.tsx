import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { web3 } from '@project-serum/anchor'
import { sha256 } from 'js-sha256'
import camelcase from 'camelcase'
import bs58 from 'bs58'

import configs from 'configs'
import IPFS from 'helpers/ipfs'
import { getCID } from 'helpers'

const {
  sol: { interDao },
} = configs

/**
 * Interface & Utility
 */

export type CommentProposal = {
  time: string
  content: string
  vote?: 'vote-for' | 'vote-against'
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
const ipfs = new IPFS()
/**
 * Actions
 */

export const deriveDiscriminator = (proposal: string) => {
  const key = `${proposal}`
  return Buffer.from(
    sha256.digest(`proposal:${camelcase(key, { pascalCase: true })}`),
  ).slice(0, 8)
}

export const deriveIpfsolAddress = async (
  discriminator: Buffer,
  walletAddress: string,
) => {
  const [ipfsol] = await web3.PublicKey.findProgramAddress(
    [
      Buffer.from('ipfsol'),
      discriminator,
      new web3.PublicKey(walletAddress).toBuffer(),
    ],
    configs.sol.interDao.program.programId,
  )
  return ipfsol
}

export const getComments = createAsyncThunk(
  `${NAME}/getComments`,
  async (proposal: string) => {
    const discriminator = deriveDiscriminator(proposal)
    const ipfsols = await interDao.program.account.ipfsol.all([
      { memcmp: { offset: 40, bytes: bs58.encode(discriminator) } },
    ])

    let bulk: Record<WalletAddress, CommentProposal[]> = {}
    await Promise.all(
      ipfsols.map(async (elm) => {
        const cid = getCID(elm.account.cid)
        const data = await ipfs.get<CommentProposal[]>(cid)
        bulk[elm.account.authority.toBase58()] = data
      }),
    )
    console.log('ipfsols', ipfsols)
    return {
      [proposal]: bulk,
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
    void builder.addCase(
      getComments.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
