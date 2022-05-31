import { useCallback, useEffect, useState } from 'react'

import { MetadataDataType } from 'app/helpers/metaplex'
import useOwerNFT from './useOwnerNFT'

const useOwnerNftByCollection = (ownerPublickey: string) => {
  const { nfts } = useOwerNFT(ownerPublickey)
  const [nftsFiltered, setNftsFiltered] =
    useState<Record<string, MetadataDataType[]>>()

  const filterNFTsByCollection = useCallback(async () => {
    let listNFTs: Record<string, MetadataDataType[]> = {}
    nfts?.forEach((nft: MetadataDataType) => {
      if (nft.collection) {
        listNFTs[nft.collection.key] = listNFTs[nft.collection.key]
          ? [...listNFTs[nft.collection.key], nft]
          : [nft]
      }
    })
    return setNftsFiltered(listNFTs)
  }, [nfts])

  useEffect(() => {
    filterNFTsByCollection()
  }, [filterNFTsByCollection])

  return { nfts: nftsFiltered }
}

export default useOwnerNftByCollection
