import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'
import { net } from '@sentre/senhub'

import {
  fecthTokenHoldersFromSmartContract,
  fetchTokenHoldersFromSolScan,
} from 'helpers/tokenHolders'

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
  let members = 0

  if (net === 'devnet')
    members = await fecthTokenHoldersFromSmartContract(mintAddress)
  if (net === 'mainnet')
    members = await fetchTokenHoldersFromSolScan(mintAddress)

  return { [daoAddress]: members }
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
