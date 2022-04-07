import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'
import { utils } from '@project-serum/anchor'

import configs from 'app/configs'

const {
  sol: { interDao },
} = configs

/**
 * Interface & Utility
 */

export type Metadata = {
  members: number
  description: string
  bannel: string
  avatar: string
}
export type MetadataState = Record<string, Metadata>

/**
 * Store constructor
 */

const NAME = 'metadata'
const initialState: MetadataState = {}

/**
 * Actions
 */

export const getMember = createAsyncThunk<
  MetadataState,
  { daoAddress: string; force?: boolean },
  { state: any }
>(`${NAME}/getMember`, async ({ daoAddress, force }, { getState }) => {
  if (!account.isAddress(daoAddress)) throw new Error('Invalid address')
  const {
    dao: {
      [daoAddress]: { mint },
    },
    metadata: { [daoAddress]: data },
  } = getState()
  const mintAddress = mint.toBase58()
  if (!account.isAddress(mintAddress)) return {}
  if (data && !force) return { [daoAddress]: data }
  const {
    provider: { connection },
  } = interDao.program
  const accounts = await connection.getProgramAccounts(
    utils.token.TOKEN_PROGRAM_ID,
    {
      filters: [
        { dataSize: 165 },
        { memcmp: { bytes: mintAddress, offset: 0 } },
      ],
    },
  )
  return { [daoAddress]: { members: accounts.length } }
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
      getMember.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
