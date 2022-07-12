import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import configs from 'configs'
import { AppDispatch } from 'model'
import {
  clearTemplate,
  setTemplateData,
  setTemplateName,
  setTx,
  setVisible,
} from 'model/template.controller'
import { TemplateIdl } from '../index'
import {
  parserIxData,
  parserIxDataNoPrefix,
  parserProposalReturnType,
} from '../core/templateParser'
import useDaoNameUrl from 'hooks/dao/useDaoNameUrl'

const {
  manifest: { appId },
} = configs

export const useConfirmIdl = () => {
  const dispatch = useDispatch<AppDispatch>()
  const history = useHistory()
  const { daoAddress } = useParams<{ daoAddress: string }>()
  const { daoNameUrl } = useDaoNameUrl(daoAddress)

  const confirm = useCallback(
    async (
      templateIdl: TemplateIdl,
      templateData: Record<string, string>,
      normalParse: boolean = false,
    ) => {
      console.log('templateIdl: ', templateIdl)
      console.log('templateData: ', templateData)
      const ix = normalParse
        ? await parserIxData(templateIdl, templateData)
        : await parserIxDataNoPrefix(templateIdl, templateData)
      const tx = await parserProposalReturnType(templateIdl, ix)
      await dispatch(setTemplateName(templateIdl.name))
      await dispatch(setTx(tx))
      await dispatch(setVisible(false))
      await dispatch(setTemplateData(templateData))
      return history.push(
        `/app/${appId}/dao/${daoAddress}/${daoNameUrl}/new-proposal`,
      )
    },
    [daoAddress, daoNameUrl, dispatch, history],
  )

  const close = useCallback(async () => {
    await dispatch(clearTemplate())
  }, [dispatch])

  return { confirm, close }
}
