import { configureStore } from '@reduxjs/toolkit'
import { devTools, bigintSerializationMiddleware } from 'app/model/devTools'

import daos from 'app/model/daos.controller'
import metadata from 'app/model/metadata.controller'
import proposal from 'app/model/proposal.controller'
import receipt from 'app/model/receipt.controller'
import voteBid from 'app/model/voteBid.controller'
import template from 'app/model/template.controller'

/**
 * Isolated store
 */
const model = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(bigintSerializationMiddleware),
  devTools: devTools(process.env.REACT_APP_ID as string),
  reducer: {
    daos,
    metadata,
    proposal,
    receipt,
    voteBid,
    template,
  },
})

export type AppState = ReturnType<typeof model.getState>
export type AppDispatch = typeof model.dispatch
export default model
