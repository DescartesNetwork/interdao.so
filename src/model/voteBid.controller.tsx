import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type VoteBidState = {
  amount: string
}

/**
 * Store constructor
 */

const NAME = 'voteBid'
const initialState: VoteBidState = {
  amount: '',
}

/**
 * Actions
 */

export const setVoteBidAmount = createAsyncThunk(
  `${NAME}/setVoteBidAmount`,
  async (amount: string) => {
    if (!amount) return { amount: '' }
    return { amount }
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
    void builder.addCase(
      setVoteBidAmount.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
