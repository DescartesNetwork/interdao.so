import { useCallback, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'

import LocalMetadata, { MetaData } from 'app/helpers/localMetadata'

const useMetaData = (daoAddress: string) => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const [metaData, setMetaData] = useState<MetaData>()

  const getMetaData = useCallback(async () => {
    if (!account.isAddress(daoAddress)) return setMetaData(undefined)
    const localMetadata = new LocalMetadata(daoAddress, walletAddress)
    const data = await localMetadata.get()
    if (!data) return
    setMetaData(data)
  }, [daoAddress, walletAddress])

  useEffect(() => {
    getMetaData()
  }, [getMetaData])

  return metaData
}

export default useMetaData
