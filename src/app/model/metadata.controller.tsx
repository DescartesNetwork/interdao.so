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

export const SOCIAL_MEDIA = ['twitter', 'discord']

const getDefaultSocial = () => {
  return SOCIAL_MEDIA.map(() => '')
}

const DEFAULT_CREATE_METADATA = {
  daoName: '',
  description: '',
  image: '',
  optionals: getDefaultSocial(),
}

export type MetaData = {
  daoName: string
  description: string
  image: string | ArrayBuffer | null
  optionals: string[]
}
export type MetaDataMember = { members: number }
export type DaoMetaDataState = Record<string, MetaDataMember>
export type MetaDataState = {
  daoMetaData: DaoMetaDataState
  createMetaData: MetaData
}

/**
 * Store constructor
 */

const NAME = 'metadata'
const initialState: MetaDataState = {
  daoMetaData: {},
  createMetaData: DEFAULT_CREATE_METADATA,
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
      daoMetaData: { [daoAddress]: data },
    },
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
  return { daoMetaData: { [daoAddress]: { members: accounts.length } } }
})

export const setCreateDaoMetaData = createAsyncThunk(
  `${NAME}/setCreateDaoMetaData`,
  async (metaData?: MetaData) => {
    if (!metaData) return { createMetaData: DEFAULT_CREATE_METADATA }
    return { createMetaData: metaData }
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
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setCreateDaoMetaData.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
