import { configureStore } from '@reduxjs/toolkit'
import { devTools, bigintSerializationMiddleware } from 'shared/devTools'

import dao from 'app/model/dao.controller'
import metadata from 'app/model/metadata.controller'
import proposal from 'app/model/proposal.controller'
import receipt from 'app/model/receipt.controller'
import voteBid from 'app/model/voteBid.controller'
import template from 'app/model/template.controller'
import voteNFT from 'app/model/voteNFT.controller'

/**
 * Isolated store
 */
const model = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(bigintSerializationMiddleware),
  devTools: devTools(process.env.REACT_APP_ID as string),
  reducer: {
    dao,
    metadata,
    proposal,
    receipt,
    voteBid,
    template,
    voteNFT,
  },
})

export type AppState = ReturnType<typeof model.getState>
export type AppDispatch = typeof model.dispatch
export default model
