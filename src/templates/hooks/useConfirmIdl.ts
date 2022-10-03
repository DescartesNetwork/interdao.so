import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import configs from 'configs'
import { AppDispatch } from 'model'
import { clearTemplate, confirmTemplate } from 'model/template.controller'

import { TemplateConfig } from './../index'
import { useAppRoute } from '@sentre/senhub'

const {
  manifest: { appId },
} = configs

export const useConfirmIdl = () => {
  const dispatch = useDispatch<AppDispatch>()
  const appRoute = useAppRoute(appId)

  const confirm = useCallback(
    async (
      daoAddress: string,
      templateConfig: TemplateConfig<any>,
      templateData: Record<string, string>,
      transactions: web3.Transaction[],
    ) => {
      const defaultPublickey = web3.Keypair.generate().publicKey
      const serializedTxs = transactions.map((transaction) => {
        // Fix for serialize is require recentBlockhash + feePayer
        transaction.recentBlockhash = defaultPublickey.toBase58()
        transaction.feePayer = defaultPublickey
        // Serialize transaction base64
        return transaction
          .serialize({
            requireAllSignatures: false,
          })
          .toString('base64')
      })
      const template = {
        templateConfig,
        templateData,
        serializedTxs,
        daoAddress,
      }
      await dispatch(confirmTemplate(template))
      return appRoute.to(`/new-proposal`)
    },
    [appRoute, dispatch],
  )

  const close = useCallback(async () => {
    await dispatch(clearTemplate())
  }, [dispatch])

  return { confirm, close }
}
