import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TemplateNames } from 'app/templates'

import { ProposalReturnType } from 'app/view/templates/types'

/**
 * Interface & Utility
 */

export type TemplateState = {
  visible: boolean
  tx?: ProposalReturnType
  templateName?: TemplateNames
  data: Record<string, string>
}

/**
 * Store constructor
 */

const NAME = 'template'
const initialState: TemplateState = {
  visible: false,
  tx: undefined,
  templateName: undefined,
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
  async (name?: TemplateNames) => {
    return { templateName: name }
  },
)

export const setTemplateData = createAsyncThunk(
  `${NAME}/setTemplateData`,
  async (templateData: Record<string, string>) => {
    return templateData
  },
)

export const clearTemplate = createAsyncThunk(
  `${NAME}/clearTemplate`,
  async () => {
    return { visible: false, tx: undefined, templateName: undefined, data: {} }
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
        setTemplateData.fulfilled,
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
      )
      .addCase(
        clearTemplate.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
