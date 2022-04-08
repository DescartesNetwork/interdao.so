import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type ProposalDataAction = {
  title?: string
  description?: string
  link?: string
  startDate?: number
  endDate?: number
  consensusMechanism?: string
  consensusQuorum?: string
  daoAddress?: string
}

export type ProposalDataActionState = {
  proposalData?: ProposalDataAction
}

/**
 * Store constructor
 */

const NAME = 'metadata'
const initialState: ProposalDataActionState = {
  proposalData: undefined,
}

/**
 * Actions
 */

export const setProposal = createAsyncThunk<
  ProposalDataActionState,
  { proposalParams: ProposalDataAction },
  { state: any }
>(`${NAME}/setProposal`, async ({ proposalParams }, { getState }) => {
  const {
    proposalAction: { proposalData },
  } = getState()
  const newProposal = { ...proposalData, ...proposalParams }
  return { proposalData: newProposal }
})

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder.addCase(
      setProposal.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
