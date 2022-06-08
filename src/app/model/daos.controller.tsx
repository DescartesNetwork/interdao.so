import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'
import { DaoData, DAO_DISCRIMINATOR } from '@interdao/core'

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
  return bulk
})

export const getDao = createAsyncThunk<
  Partial<DaoState>,
  { address: string; force?: boolean },
  { state: any }
>(`${NAME}/getDao`, async ({ address, force }, { getState }) => {
  if (!account.isAddress(address)) throw new Error('Invalid address')
  const {
    daos: { [address]: data },
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
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetDao.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
