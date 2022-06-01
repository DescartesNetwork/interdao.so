import { useCallback, useEffect, useState } from 'react'

import { getNftMetaData, MetadataType } from 'app/helpers/metaplex'

const useNftMetaData = (mintAddress: string) => {
  const [metaData, setMetaData] = useState<MetadataType>()

  const getMetaData = useCallback(async () => {
    const metadata = await getNftMetaData(mintAddress)
    setMetaData(metadata)
  }, [mintAddress])

  useEffect(() => {
    getMetaData()
  }, [getMetaData])

  return metaData
}

export default useNftMetaData
