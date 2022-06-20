import { useCallback, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'
import axios from 'axios'

import { DataLoader } from 'shared/dataloader'
import { getNftMetaData, MetadataType } from 'app/helpers/metaplex'

const useNftMetaData = (mintAddress: string) => {
  const [metaData, setMetaData] = useState<MetadataType>()
  const [nftInfo, setNftInfo] = useState<any>()
  const [loading, setLoading] = useState(false)

  const getMetaData = useCallback(async () => {
    if (!account.isAddress(mintAddress)) {
      setMetaData(undefined)
      return setNftInfo(undefined)
    }
    setLoading(true)
    try {
      const metadata = await DataLoader.load(
        'getNftMetadata' + mintAddress,
        () => getNftMetaData(mintAddress),
        { cache: { ttl: 99999999 } },
      )
      setMetaData(metadata)

      const url = metadata.data.data.uri
      const response = await DataLoader.load(
        'getNftMetadataUrl' + mintAddress,
        () => axios.get(url),
        { cache: { ttl: 99999999 } },
      )
      setNftInfo(response.data)
    } catch (error: any) {
      setMetaData(undefined)
      setNftInfo(undefined)
    } finally {
      setLoading(false)
    }
  }, [mintAddress])

  useEffect(() => {
    getMetaData()
  }, [getMetaData])

  return { metadata: metaData, nftInfo, loading }
}

export default useNftMetaData
