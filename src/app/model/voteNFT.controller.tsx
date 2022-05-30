import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type VoteNFTState = {
  nftAddress: string
}

/**
 * Store constructor
 */

const NAME = 'voteNFT'
const initialState: VoteNFTState = {
  nftAddress: '',
}

/**
 * Actions
 */

export const setVoteNFT = createAsyncThunk(
  `${NAME}/setNftAddress`,
  async (nftAddress: string) => {
    if (!nftAddress) return { nftAddress: '' }
    return { nftAddress }
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
      setVoteNFT.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
