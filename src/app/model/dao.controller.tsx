import { AccountInfo, PublicKey } from '@solana/web3.js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DaoData } from '@interdao/core'

import configs from 'app/configs'

const {
  sol: { interDao },
} = configs

/**
 * Interface & Utility
 */

export type DaoState = Record<string, DaoData>

/**
 * Store constructor
 */

const NAME = 'dao'
const initialState: DaoState = {}

/**
 * Actions
 */

export const getDaos = createAsyncThunk(`${NAME}/getDaos`, async () => {
  const {
    provider: { connection },
    programId,
    account,
    coder,
  } = interDao.program
  const value: Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }> =
    await connection.getProgramAccounts(programId, {
      filters: [{ dataSize: account.dao.size }],
    })
  let bulk: DaoState = {}
  value.forEach(({ pubkey, account: { data: buf } }) => {
    const address = pubkey.toBase58()
    const data = coder.accounts.decode('dao', buf)
    bulk[address] = data
  })
  return bulk
})

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder.addCase(
      getDaos.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
