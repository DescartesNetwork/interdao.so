import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import configs from 'app/configs'
import { AppDispatch } from 'app/model'
import {
  setTemplateName,
  setTx,
  setVisible,
} from 'app/model/template.controller'
import { TemplateIdl } from '../index'
import { useParser } from './useParser'

const {
  manifest: { appId },
} = configs

export const useConfirmIdl = () => {
  const { parserIxDataNoPrefix, parserProposalReturnType } = useParser()
  const dispatch = useDispatch<AppDispatch>()
  const history = useHistory()
  const { daoAddress } = useParams<{ daoAddress: string }>()

  const confirm = useCallback(
    async (templateIdl: TemplateIdl) => {
      const ix = await parserIxDataNoPrefix(templateIdl)
      const tx = await parserProposalReturnType(templateIdl, ix)
      await dispatch(setTx(tx))
      await dispatch(setTemplateName(templateIdl.name))
      await dispatch(setVisible(false))
      return history.push(`/app/${appId}/dao/${daoAddress}/new-proposal`)
    },
    [
      daoAddress,
      dispatch,
      history,
      parserIxDataNoPrefix,
      parserProposalReturnType,
    ],
  )

  const close = useCallback(async () => {
    await dispatch(setTx(undefined))
    return dispatch(setVisible(false))
  }, [dispatch])

  return { confirm, close }
}
