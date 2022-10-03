import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TemplateNames } from 'templates'

/**
 * Interface & Utility
 */

export type TemplateState = {
  visible: boolean
  templateName?: TemplateNames
  templateData: Record<string, string>
  serializedTxs: string[]
  daoAddress: string
}

/**
 * Store constructor
 */

const NAME = 'template'
const initialState: TemplateState = {
  visible: false,
  templateName: undefined,
  templateData: {},
  serializedTxs: [],
  daoAddress: '',
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

export const confirmTemplate = createAsyncThunk(
  `${NAME}/confirmTemplate`,
  async (template: {
    daoAddress: string
    templateName: TemplateNames
    serializedTxs?: string[]
    templateData: Record<string, string>
  }) => {
    return { ...template, visible: false }
  },
)

export const selectTemplate = createAsyncThunk(
  `${NAME}/selectTemplate`,
  async (name?: TemplateNames) => {
    return { templateName: name, serializedTxs: [], templateData: {} }
  },
)

export const clearTemplate = createAsyncThunk(
  `${NAME}/clearTemplate`,
  async () => {
    return {
      visible: false,
      tx: undefined,
      templateName: undefined,
      templateData: {},
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
        confirmTemplate.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setVisible.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        selectTemplate.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        clearTemplate.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
