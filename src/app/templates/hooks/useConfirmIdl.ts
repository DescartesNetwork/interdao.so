import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import configs from 'app/configs'
import { AppDispatch } from 'app/model'
import {
  clearTemplate,
  setTemplateData,
  setTemplateName,
  setTx,
  setVisible,
} from 'app/model/template.controller'
import { TemplateIdl } from '../index'
import {
  parserIxDataNoPrefix,
  parserProposalReturnType,
} from '../core/templateParser'

const {
  manifest: { appId },
} = configs

export const useConfirmIdl = () => {
  const dispatch = useDispatch<AppDispatch>()
  const history = useHistory()
  const { daoAddress } = useParams<{ daoAddress: string }>()

  const confirm = useCallback(
    async (templateIdl: TemplateIdl, templateData: Record<string, string>) => {
      const ix = await parserIxDataNoPrefix(templateIdl, templateData)
      const tx = await parserProposalReturnType(templateIdl, ix)
      await dispatch(setTemplateName(templateIdl.name))
      await dispatch(setTx(tx))
      await dispatch(setVisible(false))
      await dispatch(setTemplateData(templateData))
      return history.push(`/app/${appId}/dao/${daoAddress}/new-proposal`)
    },
    [daoAddress, dispatch, history],
  )

  const close = useCallback(async () => {
    await dispatch(clearTemplate())
  }, [dispatch])

  return { confirm, close }
}
