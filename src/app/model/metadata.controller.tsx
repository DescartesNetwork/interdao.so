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
export type MetaData = {
  daoName: string
  description: string
  image: string | ArrayBuffer | null
  optionals: string[]
  daoType: 'flexible-dao' | 'multisig-dao'
  members: DAOMember[]
  distributorAddress: string
}

const DEFAULT_META_DATA: MetaData = {
  daoName: '',
  description: '',
  image: '',
  optionals: [],
  daoType: 'flexible-dao',
  members: [],
  distributorAddress: '',
}

type MetaDataState = {
  tokenHolders: Record<string, number>
  initMetadata: MetaData
}

/**
 * Store constructor
 */

const NAME = 'metadata'
const initialState: MetaDataState = {
  tokenHolders: {},
  initMetadata: DEFAULT_META_DATA,
}

/**
 * Actions
 */

export const getTokenHolders = createAsyncThunk<
  Partial<MetaDataState>,
  { daoAddress: string; force?: boolean },
  { state: any }
>(`${NAME}/getTokenHolders`, async ({ daoAddress, force }, { getState }) => {
  if (!account.isAddress(daoAddress)) throw new Error('Invalid address')
  const {
    dao: {
      daos: {
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

export const setInitMetadata = createAsyncThunk(
  `${NAME}/setInitMetadata`,
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
        getTokenHolders.fulfilled,
        (state, { payload }) => void Object.assign(state.tokenHolders, payload),
      )
      .addCase(
        setInitMetadata.fulfilled,
        (state, { payload }) => void Object.assign(state.initMetadata, payload),
      ),
})

export default slice.reducer
