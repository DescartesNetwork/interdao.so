import { configureStore } from '@reduxjs/toolkit'
import { devTools, bigintSerializationMiddleware } from 'model/devTools'

import loading from 'model/loading.controller'
import daos from 'model/daos.controller'
import createDao from 'model/createDao.controller'
import tokenHolder from 'model/tokenHolder.controller'
import proposals from 'model/proposals.controller'
import receipt from 'model/receipt.controller'
import voteBid from 'model/voteBid.controller'
import template from 'model/template.controller'
import comments from 'model/comments.controller'

/**
 * Isolated store
 */
const model = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(bigintSerializationMiddleware),
  devTools: devTools(process.env.REACT_APP_ID as string),
  reducer: {
    createDao,
    daos,
    tokenHolder,
    proposals,
    receipt,
    voteBid,
    template,
    loading,
    comments,
  },
})

export type AppState = ReturnType<typeof model.getState>
export type AppDispatch = typeof model.dispatch
export default model
