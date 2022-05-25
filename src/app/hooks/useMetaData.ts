import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { MetaData } from 'app/model/metadata.controller'
import usePDB from './usePDB'
import IPFS from 'shared/pdb/ipfs'
import { AppState } from 'app/model'
import { getCID } from 'app/helpers'

const ipfs = new IPFS()

const useMetaData = (daoAddress: string) => {
  const [metaData, setMetaData] = useState<MetaData>()
  const daos = useSelector((state: AppState) => state.dao.daos)
  const pdb = usePDB()

  const getMetaData = useCallback(async () => {
    if (!account.isAddress(daoAddress)) return setMetaData(undefined)
    const data = (await pdb.getItem(daoAddress)) as MetaData
    if (data) return setMetaData(data)

    let metadataId = daos[daoAddress].metadata
    const cid = getCID(metadataId)
    const metadata: MetaData = await ipfs.get(cid)
    await pdb.setItem(daoAddress, metadata)
    return setMetaData(data)
  }, [daoAddress, daos, pdb])

  useEffect(() => {
    getMetaData()
  }, [getMetaData])

  return metaData
}

export default useMetaData
