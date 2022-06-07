import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { DaoRegime, DaoRegimes } from '@interdao/core'
import { web3 } from '@project-serum/anchor'
import BN from 'bn.js'

export const DEFAULT_DAO_DATA: CreateDaoData = {
  mintAddress: '',
  supply: new BN(0),
  metadata: undefined,
  dao: undefined,
  regime: DaoRegimes.Dictatorial,
  isPublic: true,
  isNft: false,
}

/**
 * Interface & Utility
 */

export type CreateDaoData = {
  mintAddress: string
  supply: BN
  metadata?: Buffer
  dao?: web3.Keypair
  regime: DaoRegime
  isPublic: boolean
  isNft: boolean
}

export enum CreateDaoSteps {
  ChooseType,
  InputDetails,
  SetRule,
  Review,
}

export type CreateDaoState = {
  step: CreateDaoSteps
  data: CreateDaoData
}

/**
 * Store constructor
 */

const NAME = 'createDao'
const initialState: CreateDaoState = {
  step: CreateDaoSteps.ChooseType,
  data: { ...DEFAULT_DAO_DATA },
}

/**
 * Actions
 */

export const submitStepChooseType = createAsyncThunk<
  CreateDaoState,
  { regime: DaoRegime },
  { state: { createDao: CreateDaoState } }
>(`${NAME}/submitStepChooseType`, async ({ regime }, { getState }) => {
  const { createDao } = getState()
  const newState: CreateDaoState = {
    step: CreateDaoSteps.InputDetails,
    data: { ...createDao.data, regime },
  }
  return newState
})

export const clearCreateDao = createAsyncThunk<CreateDaoState>(
  `${NAME}/clearCreateDao`,
  async () => {
    return {
      step: CreateDaoSteps.ChooseType,
      data: { ...DEFAULT_DAO_DATA },
    }
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
        submitStepChooseType.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        clearCreateDao.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
