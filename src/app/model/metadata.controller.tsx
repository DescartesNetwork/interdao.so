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

export type DAOMember = {
  name: string
  walletAddress: string
}

const DEFAULT_META_DATA = {
  address: '',
  daoName: '',
  description: '',
  image: '',
  optionals: [],
  daoRegime: '',
  daoType: '',
  members: [],
}

export type MetaData = {
  daoName: string
  description: string
  image: string | ArrayBuffer | null
  optionals: string[]
  address: string
  daoRegime: string
  daoType: string
  members: DAOMember[]
}
type TokenHolderState = Record<string, number>
type MetaDataState = {
  tokenHolders: TokenHolderState
  createMetaData: MetaData
}

/**
 * Store constructor
 */

const NAME = 'metadata'
const initialState: MetaDataState = {
  tokenHolders: {},
  createMetaData: DEFAULT_META_DATA,
}

/**
 * Actions
 */

export const getMember = createAsyncThunk<
  Partial<MetaDataState>,
  { daoAddress: string; force?: boolean },
  { state: any }
>(`${NAME}/getMember`, async ({ daoAddress, force }, { getState }) => {
  if (!account.isAddress(daoAddress)) throw new Error('Invalid address')
  const {
    dao: {
      daoData: {
        [daoAddress]: { mint },
      },
    },
    metadata: {
      tokenHolders: { [daoAddress]: amountHolder },
    },
  } = getState()

  const mintAddress = mint.toBase58()
  if (!account.isAddress(mintAddress)) return {}
  if (amountHolder && !force) return { [daoAddress]: amountHolder }
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
  return { [daoAddress]: accounts.length }
})

export const setCreateDaoMetaData = createAsyncThunk(
  `${NAME}/setCreateDaoMetaData`,
  async (metaData?: Partial<MetaData>) => {
    if (!metaData) return DEFAULT_META_DATA
    return metaData
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
        getMember.fulfilled,
        (state, { payload }) => void Object.assign(state.tokenHolders, payload),
      )
      .addCase(
        setCreateDaoMetaData.fulfilled,
        (state, { payload }) =>
          void Object.assign(state.createMetaData, payload),
      ),
})

export default slice.reducer
