import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'
import { utils } from '@project-serum/anchor'

import configs from 'configs'
import { DataLoader } from '@sentre/senhub'

const {
  sol: { interDao },
} = configs

/**
 * Interface & Utility
 */

type TokenHolderState = Record<string, number>

/**
 * Store constructor
 */

const NAME = 'tokenHolder'
const initialState: TokenHolderState = {}

/**
 * Actions
 */

export const getTokenHolders = createAsyncThunk<
  Partial<TokenHolderState>,
  { daoAddress: string; force?: boolean },
  { state: any }
>(`${NAME}/getTokenHolders`, async ({ daoAddress, force }, { getState }) => {
  if (!account.isAddress(daoAddress)) throw new Error('Invalid address')
  const {
    daos: {
      [daoAddress]: { mint },
    },
    tokenHolder: { [daoAddress]: amountHolder },
  } = getState()

  const mintAddress = mint.toBase58()
  if (!account.isAddress(mintAddress)) return {}
  if (amountHolder && !force) return { [daoAddress]: amountHolder }
  const {
    provider: { connection },
  } = interDao.program

  const accounts = await DataLoader.load(
    'getTokenHolders' + mintAddress,
    () => {
      return connection.getProgramAccounts(utils.token.TOKEN_PROGRAM_ID, {
        filters: [
          { dataSize: 165 },
          { memcmp: { bytes: mintAddress, offset: 0 } },
        ],
      })
    },
  )
  return { [daoAddress]: accounts.length }
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
      getTokenHolders.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
