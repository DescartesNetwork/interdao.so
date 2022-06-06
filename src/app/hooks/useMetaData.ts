import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { DaoData } from '@interdao/core'

import { MetaData } from 'app/model/metadata.controller'
import usePDB from './usePDB'
import IPFS from 'shared/pdb/ipfs'
import { AppState } from 'app/model'
import { getCID } from 'app/helpers'
import { LocalMetadata } from 'app/watcher/metadata.watcher'

const ipfs = new IPFS()

const useMetaData = (daoAddress: string) => {
  const [metaData, setMetaData] = useState<MetaData>()
  const daos = useSelector((state: AppState) => state.daos.daos)
  const pdb = usePDB()

  const getMetaData = useCallback(async () => {
    if (!account.isAddress(daoAddress)) return setMetaData(undefined)
    const data = (await pdb.getItem(daoAddress)) as LocalMetadata
    const { metadata: digest } = daos[daoAddress] || ({} as DaoData)
    if (!digest) return
    const cid = getCID(digest)
    if (data && cid === data.cid) return setMetaData(data)

    const metadata: MetaData = await ipfs.get(cid)
    if (!metadata) return
    const localMetadata = { ...metadata, cid }
    await pdb.setItem(daoAddress, localMetadata)

    return setMetaData(metadata)
  }, [daoAddress, daos, pdb])

  useEffect(() => {
    getMetaData()
  }, [getMetaData])

  return metaData
}

export default useMetaData
