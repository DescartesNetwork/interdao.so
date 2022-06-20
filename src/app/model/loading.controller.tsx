import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type LoadingState = Record<string, { loading: boolean; message: string }>
/**
 * Store constructor
 */

const NAME = 'voteBid'
const initialState: LoadingState = {}

/**
 * Actions
 */

export const addLoading = createAsyncThunk<
  LoadingState,
  { id: string; message: string }
>(`${NAME}/addLoading`, async ({ id, message }) => {
  return { [id]: { loading: true, message } }
})

export const clearLoading = createAsyncThunk(
  `${NAME}/clearLoading`,
  async (id: string) => {
    return { [id]: { loading: false, message: '' } }
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
        addLoading.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        clearLoading.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
