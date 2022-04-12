import { AccountInfo, PublicKey } from '@solana/web3.js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DaoData, DAO_DISCRIMINATOR } from '@interdao/core'
import { account } from '@senswap/sen-js'

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
    account: { dao },
  } = interDao.program
  const value: Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }> =
    await connection.getProgramAccounts(programId, {
      filters: [
        { dataSize: dao.size },
        {
          memcmp: {
            offset: 0,
            bytes: DAO_DISCRIMINATOR,
          },
        },
      ],
    })
  let bulk: DaoState = {}
  value.forEach(({ pubkey, account: { data: buf } }) => {
    const address = pubkey.toBase58()
    const data = interDao.parseDaoData(buf)
    bulk[address] = data
  })
  return bulk
})

export const getDao = createAsyncThunk<
  DaoState,
  { address: string; force?: boolean },
  { state: any }
>(`${NAME}/getDao`, async ({ address, force }, { getState }) => {
  if (!account.isAddress(address)) throw new Error('Invalid address')
  const {
    dao: { [address]: data },
  } = getState()
  if (data && !force) return { [address]: data }
  const raw = await interDao.getDaoData(address)
  return { [address]: raw }
})

export const upsetDao = createAsyncThunk<
  DaoState,
  { address: string; data: DaoData },
  { state: any }
>(`${NAME}/upsetDao`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

export const deleteDao = createAsyncThunk(
  `${NAME}/deleteDao`,
  async ({ address }: { address: string }) => {
    if (!account.isAddress(address)) throw new Error('Invalid address')
    return { address }
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
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetDao.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        deleteDao.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
