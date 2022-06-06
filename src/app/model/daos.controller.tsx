import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'
import {
  DaoData,
  DAO_DISCRIMINATOR,
  DaoRegime,
  DaoRegimes,
} from '@interdao/core'
import { web3 } from '@project-serum/anchor'
import BN from 'bn.js'

import configs from 'app/configs'

const {
  sol: { interDao },
} = configs

/**
 * Interface & Utility
 */

export const DEFAULT_DAO_DATA = {
  mintAddress: '',
  supply: new BN(0),
  metadata: undefined,
  dao: undefined,
  regime: DaoRegimes.Dictatorial,
  isPublic: true,
  isNft: false,
}

export type InitDao = {
  mintAddress: string
  supply: BN
  metadata?: Buffer
  dao?: web3.Keypair
  regime: DaoRegime
  isPublic: boolean
  isNft: boolean
}

export type DaoState = {
  daos: Record<string, DaoData>
  initDao: InitDao
}

/**
 * Store constructor
 */

const NAME = 'dao'
const initialState: DaoState = {
  daos: {},
  initDao: DEFAULT_DAO_DATA,
}

/**
 * Actions
 */

export const getDaos = createAsyncThunk(`${NAME}/getDaos`, async () => {
  const accounts = await interDao.program.account.dao.all([
    {
      memcmp: {
        offset: 0,
        bytes: DAO_DISCRIMINATOR,
      },
    },
  ])
  let bulk: Record<string, DaoData> = {}
  accounts.forEach(({ publicKey, account }) => {
    const address = publicKey.toBase58()
    bulk[address] = account as any
  })
  return { daos: bulk }
})

export const getDao = createAsyncThunk<
  Partial<DaoState>,
  { address: string; force?: boolean },
  { state: any }
>(`${NAME}/getDao`, async ({ address, force }, { getState }) => {
  if (!account.isAddress(address)) throw new Error('Invalid address')
  const {
    dao: {
      daos: { [address]: data },
    },
  } = getState()
  if (data && !force) return { [address]: data }
  const daoData: DaoData = await interDao.getDaoData(address)
  return {
    [address]: daoData,
  }
})

export const upsetDao = createAsyncThunk<
  Partial<DaoState>,
  { address: string; data: DaoData },
  { state: any }
>(`${NAME}/upsetDao`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid address')
  if (!data) throw new Error('Data is empty')
  return {
    [address]: { ...data },
  }
})

export const setInitDao = createAsyncThunk(
  `${NAME}/setInitDao`,
  async (initDao?: InitDao) => {
    if (!initDao) return { initDao: DEFAULT_DAO_DATA }
    return { initDao }
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
        getDaos.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        getDao.fulfilled,
        (state, { payload }) => void Object.assign(state.daos, payload),
      )
      .addCase(
        upsetDao.fulfilled,
        (state, { payload }) => void Object.assign(state.daos, payload),
      )
      .addCase(
        setInitDao.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
