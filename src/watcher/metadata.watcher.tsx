import { Fragment, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'model'
import { getCID } from 'helpers'
import IPFS from 'helpers/ipfs'
import usePDB from 'hooks/usePDB'
import { MetaData } from 'model/createDao.controller'

const ipfs = new IPFS()

export type LocalMetadata = {
  cid: string
} & MetaData

const MetadataWatcher = () => {
  const daos = useSelector((state: AppState) => state.daos)
  const pdb = usePDB()

  const loadAllMetaData = useCallback(async () => {
    Object.keys(daos).map(async (daoAddress) => {
      const metadata = (await pdb.getItem(daoAddress)) as LocalMetadata
      const { metadata: digest } = daos[daoAddress]
      const cid = getCID(digest)
      if (metadata && metadata.cid === cid) return
      const data: MetaData = await ipfs.get(cid)
      if (!data) return
      const localMetadata = { ...data, cid }
      await pdb.setItem(daoAddress, localMetadata)
    })
  }, [daos, pdb])

  useEffect(() => {
    loadAllMetaData()
  }, [loadAllMetaData])

  return <Fragment />
}

export default MetadataWatcher
