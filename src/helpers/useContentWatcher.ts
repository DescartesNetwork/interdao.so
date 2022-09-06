import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { sha256 } from 'js-sha256'
import camelcase from 'camelcase'
import bs58 from 'bs58'

import { deriveDiscriminator, upsetComment } from 'model/comments.controller'
import { AppDispatch } from 'model'
import configs from 'configs'
import { notifyError } from 'helpers'

const {
  sol: { interDao },
} = configs

let watcherId = 0

export const accountDiscriminator = (name: string): Buffer => {
  return Buffer.from(
    sha256.digest(`account:${camelcase(name, { pascalCase: true })}`),
  ).slice(0, 8)
}

export const useContentWatcher = (proposal: string) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const watchData = useCallback(async () => {
    const discriminator = deriveDiscriminator(proposal)
    watcherId = interDao.program.provider.connection.onProgramAccountChange(
      interDao.program.programId,
      async (data) => {
        try {
          const content = interDao.parseContentData(data.accountInfo.data)
          setLoading(true)
          await dispatch(
            upsetComment({
              proposal,
              wallet: content.authority.toBase58(),
              metadata: content.metadata,
            }),
          ).unwrap()
        } catch (error) {
          notifyError(error)
        } finally {
          setLoading(false)
        }
      },
      'confirmed',
      [
        {
          memcmp: {
            offset: 0,
            bytes: bs58.encode(accountDiscriminator('content')),
          },
        },
        { memcmp: { offset: 40, bytes: bs58.encode(discriminator) } },
      ],
    )
    if (!watcherId) setTimeout(() => watchData(), 500)
  }, [dispatch, proposal])

  useEffect(() => {
    watchData()
    return () => {
      ;(async () => {
        if (watcherId)
          await interDao.program.provider.connection.removeProgramAccountChangeListener(
            watcherId,
          )
      })()
    }
  }, [watchData])

  return { loading }
}
