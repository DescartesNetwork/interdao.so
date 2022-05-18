import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'
import { utils } from '@project-serum/anchor'
import { ConsensusQuorum, ConsensusQuorums } from '@interdao/core'

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

export type DAOMember = {
  name: string
  walletAddress: string
}

export const DEFAULT_META_DATA = {
  address: '',
  daoName: '',
  description: '',
  image: '',
  optionals: getDefaultSocial(),
  daoRegime: '',
  daoType: '',
  members: [],
  quorum: ConsensusQuorums.Haft,
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
  quorum: ConsensusQuorum
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
  return { [daoAddress]: { members: accounts.length } }
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
        (state, { payload }) => void Object.assign(state.daoMetaData, payload),
      )
      .addCase(
        setCreateDaoMetaData.fulfilled,
        (state, { payload }) =>
          void Object.assign(state.createMetaData, payload),
      ),
})

export default slice.reducer
