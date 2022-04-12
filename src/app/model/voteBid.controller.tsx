import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type VoteBidState = {
  amount: bigint
}

/**
 * Store constructor
 */

const NAME = 'voteBid'
const initialState: VoteBidState = {
  amount: BigInt(0),
}

/**
 * Actions
 */

export const setVoteBidAmount = createAsyncThunk(
  `${NAME}/setVoteBidAmount`,
  async (amount: bigint) => {
    if (!amount) return { amount: BigInt(0) }
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
