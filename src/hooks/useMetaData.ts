import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { util } from '@sentre/senhub'

import { ipfs } from 'helpers/ipfs'
import { notifyError } from 'helpers'
import { AppState } from 'model'
import { MetaData } from 'model/createDao.controller'

const useMetaData = (daoAddress: string) => {
  const [metaData, setMetaData] = useState<MetaData>()
  const [loading, setLoading] = useState(false)
  const daoData = useSelector((state: AppState) => state.daos[daoAddress])

  const getMetaData = useCallback(async () => {
    if (!util.isAddress(daoAddress) || !daoData) return setMetaData(undefined)

    try {
      setLoading(true)
      const data = await ipfs.methods.daoMetadata.get(daoData.metadata)
      setMetaData(data)
    } catch (error) {
      notifyError(error)
    } finally {
      return setLoading(false)
    }
  }, [daoAddress, daoData])

  useEffect(() => {
    getMetaData()
  }, [getMetaData])

  return { metaData, loading }
}

export default useMetaData
