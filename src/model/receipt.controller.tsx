import { web3 } from '@project-serum/anchor'
import { util } from '@sentre/senhub'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ReceiptData, RECEIPT_DISCRIMINATOR } from '@interdao/core'

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
    if (!util.isAddress(authorityAddress)) throw new Error('Invalid address')
    const {
      provider: { connection },
      programId,
      account: { receipt },
    } = window.interDao.program
    const value: Array<{
      pubkey: web3.PublicKey
      account: web3.AccountInfo<Buffer>
    }> = await connection.getProgramAccounts(programId, {
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
      const data = window.interDao.parseReceiptData(buf)
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
  if (!util.isAddress(address)) throw new Error('Invalid address')
  const {
    receipt: { [address]: data },
  } = getState()
  if (data && !force) return { [address]: data }
  const raw = await window.interDao.getReceiptData(address)
  return { [address]: raw }
})

export const deleteReceipt = createAsyncThunk(
  `${NAME}/deleteReceipt`,
  async ({ address }: { address: string }) => {
    if (!util.isAddress(address)) throw new Error('Invalid address')
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
        deleteReceipt.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
