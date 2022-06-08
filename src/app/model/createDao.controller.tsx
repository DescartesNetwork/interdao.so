import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DaoRegime, DaoRegimes } from '@interdao/core'
import { web3 } from '@project-serum/anchor'
import BN from 'bn.js'

export const DEFAULT_META_DATA: MetaData = {
  daoName: '',
  description: '',
  image: '',
  optionals: [],
  daoType: 'flexible-dao',
  members: [],
  distributorAddress: '',
}

export const DEFAULT_DAO_DATA: CreateDaoData = {
  mintAddress: '',
  supply: new BN(0),
  metadata: DEFAULT_META_DATA,
  dao: undefined,
  regime: DaoRegimes.Dictatorial,
  isPublic: true,
  isNft: false,
}

/**
 * Interface & Utility
 */
export type DaoType = 'flexible-dao' | 'multisig-dao'

export type CreateDaoData = {
  mintAddress: string
  supply: BN
  metadata: MetaData
  dao?: web3.Keypair
  regime: DaoRegime
  isPublic: boolean
  isNft: boolean
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

export type DAOMember = {
  name: string
  walletAddress: string
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
  { daoType: DaoType },
  { state: { createDao: CreateDaoState } }
>(`${NAME}/submitStepChooseType`, async ({ daoType }, { getState }) => {
  const { createDao } = getState()
  const { metadata } = createDao.data
  const newState: CreateDaoState = {
    step: CreateDaoSteps.InputDetails,
    data: { ...createDao.data, metadata: { ...metadata, daoType } },
  }
  return newState
})

export const submitStepDaoDetail = createAsyncThunk<
  CreateDaoState,
  { metadata: MetaData },
  { state: { createDao: CreateDaoState } }
>(`${NAME}/submitStepDaoDetail`, async ({ metadata }, { getState }) => {
  const { createDao } = getState()

  const newState: CreateDaoState = {
    step: CreateDaoSteps.SetRule,
    data: { ...createDao.data, metadata },
  }
  return newState
})

export const submitStepSetRule = createAsyncThunk<
  CreateDaoState,
  { rule: Partial<CreateDaoData> },
  { state: { createDao: CreateDaoState } }
>(`${NAME}/submitStepSetRule`, async ({ rule }, { getState }) => {
  const { createDao } = getState()
  if (!rule) return createDao
  const newState: CreateDaoState = {
    step: CreateDaoSteps.Review,
    data: { ...createDao.data, ...rule },
  }
  return newState
})

export const revertPrevStep = createAsyncThunk<
  CreateDaoState,
  void,
  { state: { createDao: CreateDaoState } }
>(`${NAME}/prevStep`, async (_, { getState }) => {
  const { createDao } = getState()
  let prevStep = createDao.step
  switch (prevStep) {
    case CreateDaoSteps.Review:
      prevStep = CreateDaoSteps.SetRule
      break
    case CreateDaoSteps.SetRule:
      prevStep = CreateDaoSteps.InputDetails
      break
    case CreateDaoSteps.InputDetails:
      prevStep = CreateDaoSteps.ChooseType
      break
    default:
      prevStep = CreateDaoSteps.ChooseType
      break
  }
  const newState: CreateDaoState = {
    step: prevStep,
    data: { ...createDao.data },
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
        submitStepDaoDetail.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        submitStepSetRule.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        revertPrevStep.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        clearCreateDao.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
