import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { DaoData } from '@interdao/core'

import usePDB from './usePDB'
import IPFS from 'app/helpers/ipfs'
import { AppState } from 'app/model'
import { getCID } from 'app/helpers'
import { LocalMetadata } from 'app/watcher/metadata.watcher'
import { MetaData } from 'app/model/createDao.controller'

const ipfs = new IPFS()

const useMetaData = (daoAddress: string) => {
  const [metaData, setMetaData] = useState<MetaData>()
  const [loading, setLoading] = useState(false)
  const daos = useSelector((state: AppState) => state.daos)
  const pdb = usePDB()

  const getMetaData = useCallback(async () => {
    if (!account.isAddress(daoAddress)) return setMetaData(undefined)
    setLoading(true)
    const data = (await pdb.getItem(daoAddress)) as LocalMetadata
    const { metadata: digest } = daos[daoAddress] || ({} as DaoData)
    if (!digest) return setLoading(false)
    const cid = getCID(digest)
    if (data && cid === data.cid) {
      setMetaData(data)
      return setLoading(false)
    }

    const metadata: MetaData = await ipfs.get(cid)
    if (!metadata) return setLoading(false)

    const localMetadata = { ...metadata, cid }
    await pdb.setItem(daoAddress, localMetadata)

    setMetaData(metadata)
    return setLoading(false)
  }, [daoAddress, daos, pdb])

  useEffect(() => {
    getMetaData()
  }, [getMetaData])

  return { metaData, loading }
}

export default useMetaData
