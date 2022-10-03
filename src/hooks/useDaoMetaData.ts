import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { util } from '@sentre/senhub'

import { ipfs } from 'helpers/ipfs'
import { notifyError } from 'helpers'
import { AppState } from 'model'
import { DaoMetaData } from 'model/createDao.controller'

import { APP_ROUTE } from 'configs/route'

export const useDaoMetaData = (daoAddress: string) => {
  const history = useHistory()
  const { search } = useLocation()
  const { daoAddress: daoPrams } = useParams<{ daoAddress: string }>()
  const daoData = useSelector((state: AppState) => state.daos[daoAddress])
  const [metaData, setMetaData] = useState<DaoMetaData>()

  const query = useMemo(() => new URLSearchParams(search), [search])

  const getMetaData = useCallback(async () => {
    if (!util.isAddress(daoAddress) || !daoData) return setMetaData(undefined)
    try {
      const data = await ipfs.methods.daoMetadata.get(daoData.metadata)
      setMetaData(data)
    } catch (error) {
      notifyError(error)
    }
  }, [daoAddress, daoData])

  useEffect(() => {
    getMetaData()
  }, [getMetaData])

  const getDaoName = useCallback(async () => {
    if (daoPrams !== daoAddress || !metaData?.daoName) return
    const nameQuery = query.get('daoName')
    const daoName = metaData?.daoName
      .replace(/[\W_]+/gm, '-')
      .toLocaleLowerCase()

    if (!!nameQuery && !!daoName && nameQuery !== daoName) {
      history.push(APP_ROUTE.listDaos.generatePath({}))
    }
    if (!nameQuery && !!daoName) {
      history.push({
        search: `daoName=${daoName}`,
      })
    }
  }, [daoAddress, daoPrams, history, metaData?.daoName, query])
  useEffect(() => {
    getDaoName()
  }, [getDaoName])

  return metaData
}
