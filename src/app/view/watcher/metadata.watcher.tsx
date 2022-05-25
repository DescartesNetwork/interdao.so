import { Fragment, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { getCID } from 'app/helpers'
import IPFS from 'shared/pdb/ipfs'
import { MetaData } from 'app/model/metadata.controller'
import usePDB from 'app/hooks/usePDB'

const ipfs = new IPFS()

const MetadataWatcher = () => {
  const daos = useSelector((state: AppState) => state.dao.daos)
  const pdb = usePDB()

  const loadAllMetaData = useCallback(async () => {
    const keys = await pdb.keys()
    Object.keys(daos).map(async (daoAddress) => {
      if (keys.includes(daoAddress)) return
      let metadataId = daos[daoAddress].metadata
      const cid = getCID(metadataId)
      const data: MetaData = await ipfs.get(cid)
      await pdb.setItem(daoAddress, data)
    })
  }, [daos, pdb])

  useEffect(() => {
    loadAllMetaData()
  }, [loadAllMetaData])

  return <Fragment />
}

export default MetadataWatcher
