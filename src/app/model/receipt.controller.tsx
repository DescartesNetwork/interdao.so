import { AccountInfo, PublicKey } from '@solana/web3.js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  ProposalData,
  ReceiptData,
  RECEIPT_DISCRIMINATOR,
} from '@interdao/core'
import { account } from '@senswap/sen-js'

import configs from 'app/configs'

const {
  sol: { interDao },
} = configs

/**
 * Interface & Utility
 */

export type ReceiptState = Record<string, ReceiptData>

/**
 * Store constructor
 */

const NAME = 'receipt'
const initialState: ReceiptState = {}

/**
 * Actions
 */

export const getReceipts = createAsyncThunk(
  `${NAME}/getReceipts`,
  async ({ authorityAddress }: { authorityAddress: string }) => {
    if (!account.isAddress(authorityAddress)) throw new Error('Invalid address')
    const {
      provider: { connection },
      programId,
      account: { receipt },
    } = interDao.program
    const value: Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }> =
      await connection.getProgramAccounts(programId, {
        filters: [
          { dataSize: receipt.size },
          {
            memcmp: {
              offset: 0,
              bytes: RECEIPT_DISCRIMINATOR,
            },
          },
          {
            memcmp: {
              offset: 16,
              bytes: authorityAddress,
            },
          },
        ],
      })
    let bulk: ReceiptState = {}
    value.forEach(({ pubkey, account: { data: buf } }) => {
      const address = pubkey.toBase58()
      const data = interDao.parseProposalData(buf)
      bulk[address] = data
    })
    return bulk
  },
)

export const getReceipt = createAsyncThunk<
  ReceiptState,
  { address: string; force?: boolean },
  { state: any }
>(`${NAME}/getReceipt`, async ({ address, force }, { getState }) => {
  if (!account.isAddress(address)) throw new Error('Invalid address')
  const {
    dao: { [address]: data },
  } = getState()
  if (data && !force) return { [address]: data }
  const raw = await interDao.getReceiptData(address)
  return { [address]: raw }
})

export const upsetReceipt = createAsyncThunk<
  ReceiptState,
  { address: string; data: ProposalData },
  { state: any }
>(`${NAME}/upsetReceipt`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

export const deleteReceipt = createAsyncThunk(
  `${NAME}/deleteReceipt`,
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
        getReceipts.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        getReceipt.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetReceipt.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        deleteReceipt.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
