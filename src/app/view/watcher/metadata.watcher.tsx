import { Fragment, useCallback, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@senhub/providers'

import LocalMetadata, { MetaData } from 'app/helpers/localMetadata'
import { AppState } from 'app/model'
import { getCID } from 'app/helpers'
import IPFS from 'shared/pdb/ipfs'
import PDB from 'shared/pdb'
import configs from 'app/configs'

const {
  manifest: { appId },
} = configs
const ipfs = new IPFS()

const MetadataWatcher = () => {
  const daos = useSelector((state: AppState) => state.dao.daoData)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const pdb = useMemo(() => {
    return new PDB(walletAddress).createInstance(appId)
  }, [walletAddress])

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
