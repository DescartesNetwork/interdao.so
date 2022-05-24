import { AccountInfo, PublicKey } from '@solana/web3.js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProposalData } from '@interdao/core'
import { account } from '@senswap/sen-js'

import configs from 'app/configs'

const {
  sol: { interDao },
} = configs

/**
 * Interface & Utility
 */

export type ProposalState = Record<string, ProposalData>

/**
 * Store constructor
 */

const NAME = 'proposal'
const initialState: ProposalState = {}

/**
 * Actions
 */

export const getProposals = createAsyncThunk(
  `${NAME}/getProposals`,
  async ({ daoAddress }: { daoAddress: string }) => {
    const {
      provider: { connection },
      programId,
      // account,
    } = interDao.program
    const value: Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }> =
      await connection.getProgramAccounts(programId, {
        filters: [
          {
            memcmp: {
              offset: 48,
              bytes: daoAddress,
            },
          },
        ],
      })
    let bulk: ProposalState = {}
    value.forEach(({ pubkey, account: { data: buf } }) => {
      const address = pubkey.toBase58()
      const data = interDao.parseProposalData(buf)
      bulk[address] = data
    })
    // const proposals = await account.proposal.all()
    // let bulk: ProposalState = {}
    // for (const proposal of proposals) {
    //   const proposalData: ProposalData = proposal.account as any
    //   bulk[proposal.publicKey.toBase58()] = proposalData
    // }
    return bulk
  },
)

export const getProposal = createAsyncThunk<
  ProposalState,
  { address: string; force?: boolean },
  { state: any }
>(`${NAME}/getProposal`, async ({ address, force }, { getState }) => {
  if (!account.isAddress(address)) throw new Error('Invalid address')
  const {
    dao: { [address]: data },
  } = getState()
  if (data && !force) return { [address]: data }
  const raw = await interDao.getProposalData(address)
  return { [address]: raw }
})

export const upsetProposal = createAsyncThunk<
  ProposalState,
  { address: string; data: ProposalData },
  { state: any }
>(`${NAME}/upsetProposal`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

export const deleteProposal = createAsyncThunk(
  `${NAME}/deleteProposal`,
  async ({ address }: { address: string }) => {
    if (!account.isAddress(address)) throw new Error('Invalid address')
    return { address }
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
      .addCase(
        getProposals.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        getProposal.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetProposal.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        deleteProposal.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
