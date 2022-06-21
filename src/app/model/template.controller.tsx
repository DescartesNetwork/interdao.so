import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ProposalReturnType } from 'app/view/templates/types'

/**
 * Interface & Utility
 */

export type TemplateState = {
  visible: boolean
  tx?: ProposalReturnType
  templateName: string
  data: Record<string, string>
}

/**
 * Store constructor
 */

const NAME = 'template'
const initialState: TemplateState = {
  visible: false,
  tx: undefined,
  templateName: '',
  data: {},
}

/**
 * Actions
 */

export const setVisible = createAsyncThunk(
  `${NAME}/setVisible`,
  async (visible: boolean) => {
    return { visible }
  },
)

export const setTx = createAsyncThunk(
  `${NAME}/setTx`,
  async (tx?: ProposalReturnType) => {
    return { tx }
  },
)

export const clearTx = createAsyncThunk(`${NAME}/clearTx`, async () => {
  return { tx: undefined }
})

export const setTemplateName = createAsyncThunk(
  `${NAME}/setTemplateName`,
  async (name: string) => {
    return { templateName: name }
  },
)

export const onChangeTemplateData = createAsyncThunk(
  `${NAME}/onChangeTemplateData`,
  async ({ id, value }: { id: string; value: string }) => {
    return { [id]: value }
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
        onChangeTemplateData.fulfilled,
        (state, { payload }) => void Object.assign(state.data, payload),
      )
      .addCase(
        setVisible.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setTx.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setTemplateName.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        clearTx.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
