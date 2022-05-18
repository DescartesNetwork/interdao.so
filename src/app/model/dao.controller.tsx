import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'
import {
  DaoData,
  DAO_DISCRIMINATOR,
  DaoRegime,
  DaoRegimes,
} from '@interdao/core'
import { AccountInfo, PublicKey } from '@solana/web3.js'
import { web3 } from '@project-serum/anchor'
import BN from 'bn.js'

import configs from 'app/configs'

const {
  sol: { interDao },
} = configs

/**
 * Interface & Utility
 */

export const DEFAULT_CREATE_DAO_DATA = {
  mintAddress: '',
  supply: new BN(0),
  metadata: undefined,
  dao: undefined,
  regime: DaoRegimes.Dictatorial,
}

export type DaoType = 'flexible-dao' | 'multisig-dao'

export type CreateDaoData = {
  mintAddress: string
  supply: BN
  metadata?: Buffer
  dao?: web3.Keypair
  regime: DaoRegime
}

export type DaoDataState = Record<string, DaoData>
export type DaoState = {
  daoData: DaoDataState
  createDaoData: CreateDaoData
  daoType: DaoType
}

/**
 * Store constructor
 */

const NAME = 'dao'
const initialState: DaoState = {
  daoData: {},
  createDaoData: DEFAULT_CREATE_DAO_DATA,
  daoType: 'flexible-dao',
}

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
  let bulk: DaoDataState = {}
  value.forEach(({ pubkey, account: { data: buf } }) => {
    const address = pubkey.toBase58()
    const data = interDao.parseDaoData(buf)
    bulk[address] = { ...data }
  })
  return { daoData: bulk }
})

export const getDao = createAsyncThunk<
  Partial<DaoState>,
  { address: string; force?: boolean },
  { state: any }
>(`${NAME}/getDao`, async ({ address, force }, { getState }) => {
  if (!account.isAddress(address)) throw new Error('Invalid address')
  const {
    dao: {
      daoData: { [address]: data },
    },
  } = getState()
  if (data && !force) return { [address]: data }
  const raw = await interDao.getDaoData(address)
  return {
    [address]: {
      ...raw,
    },
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

export const setCreateDaoData = createAsyncThunk(
  `${NAME}/setCreateDaoData`,
  async (createDaoData?: CreateDaoData) => {
    if (!createDaoData) return { createDaoData: DEFAULT_CREATE_DAO_DATA }
    return { createDaoData }
  },
)
export const setCreateDaoType = createAsyncThunk(
  `${NAME}/setCreateDaoType`,
  async (type: string) => {
    return { daoType: type }
  },
)

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
        (state, { payload }) => void Object.assign(state.daoData, payload),
      )
      .addCase(
        upsetDao.fulfilled,
        (state, { payload }) => void Object.assign(state.daoData, payload),
      )
      .addCase(
        setCreateDaoData.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setCreateDaoType.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        deleteDao.fulfilled,
        (state, { payload }) => void Object.assign(state.daoData, payload),
      ),
})

export default slice.reducer
