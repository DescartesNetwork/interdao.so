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
import IPFS from 'shared/pdb/ipfs'

import { getCID } from 'app/helpers'
import { MetaData } from './metadata.controller'
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

export type CreateDaoData = {
  mintAddress: string
  supply: BN
  metadata?: Buffer
  dao?: web3.Keypair
  regime: DaoRegime
}
export type ExtraDaoData = {
  meta_data?: MetaData
  address: string
  name: string
}
export type DaoMetaData = DaoData & ExtraDaoData
export type DaoDataState = Record<string, DaoMetaData>
export type DaoState = {
  daoData: DaoDataState
  createDaoData: CreateDaoData
}

/**
 * Store constructor
 */

const NAME = 'dao'
const initialState: DaoState = {
  daoData: {},
  createDaoData: DEFAULT_CREATE_DAO_DATA,
}

/**
 * Actions
 */

const sortedDaoData = async (daoData: DaoDataState) => {
  try {
    if (!daoData) throw new Error('Invalid Dao data!')
    const ipfs = new IPFS()
    const results = await Promise.all(
      Object.keys(daoData).map(async (daoAddr) => {
        const { metadata: digest } = daoData[daoAddr]
        const cid = getCID(digest)
        const data = await ipfs.get(cid)
        return {
          [daoAddr]: {
            ...daoData[daoAddr],
            meta_data: data,
            name: data?.daoName,
          },
        }
      }),
    )
    const nextDaoData: DaoDataState = {}
    for (const rs of results) {
      const daoAddr = Object.keys(rs)[0]
      nextDaoData[daoAddr] = rs[daoAddr]
    }
    if (!nextDaoData) return daoData
    return nextDaoData
  } catch (err) {
    return daoData
  }
}

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
    bulk[address] = { ...data, address, name: '' }
  })
  const daoData = await sortedDaoData(bulk)
  return { daoData }
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
    daoData: {
      [address]: {
        ...raw,
        address,
        name: data.meta_data.daoName,
      },
    },
  }
})

export const upsetDao = createAsyncThunk<
  Partial<DaoState>,
  { address: string; data: DaoData },
  { state: any }
>(`${NAME}/upsetDao`, async ({ address, data }, { getState }) => {
  if (!account.isAddress(address)) throw new Error('Invalid address')
  if (!data) throw new Error('Data is empty')
  const {
    dao: {
      daoData: {
        [address]: { meta_data },
      },
    },
  } = getState()
  return {
    daoData: {
      [address]: { ...data, address, name: meta_data.daoName },
    },
  }
})

export const setCreateDaoData = createAsyncThunk(
  `${NAME}/setCreateDaoData`,
  async (createDaoData?: CreateDaoData) => {
    if (!createDaoData) return { createDaoData: DEFAULT_CREATE_DAO_DATA }
    return { createDaoData }
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
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetDao.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setCreateDaoData.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        deleteDao.fulfilled,
        (state, { payload }) => void Object.assign(state.daoData, payload),
      ),
})

export default slice.reducer
