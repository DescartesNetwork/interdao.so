import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type VoteBidState = {
  amount: bigint
  votePower: bigint
}

/**
 * Store constructor
 */

const NAME = 'voteBid'
const initialState: VoteBidState = {
  amount: BigInt(0),
  votePower: BigInt(0),
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

export const setVotePower = createAsyncThunk(
  `${NAME}/setVotePower`,
  async (votePower: bigint) => {
    if (!votePower) return { votePower: BigInt(0) }
    return { votePower }
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
        setVoteBidAmount.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setVotePower.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
