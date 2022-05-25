import { Fragment, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@senhub/providers'

import LocalMetadata, { MetaData } from 'app/helpers/localMetadata'
import { AppState } from 'app/model'
import { getCID } from 'app/helpers'
import IPFS from 'shared/pdb/ipfs'

const MetadataWatcher = () => {
  const daoData = useSelector((state: AppState) => state.dao.daoData)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const cacheData = useCallback(async () => {
    const daoAddresses = Object.keys(daoData)

    for (const daoAddress of daoAddresses) {
      const ipfs = new IPFS()
      const localMetadata = new LocalMetadata(daoAddress, walletAddress)
      const metadata = await localMetadata.get()
      if (metadata) continue

      const { metadata: digest } = daoData[daoAddress]
      const cid = getCID(digest)
      const data = (await ipfs.get(cid)) as MetaData
      if (!data) continue
      console.log('data', data)
      await localMetadata.set(data)
    }
    console.log('done')
  }, [daoData, walletAddress])

  useEffect(() => {
    cacheData()
  }, [cacheData])

  console.log(1)

  return <Fragment />
}

export default MetadataWatcher
