import { useCallback, useEffect, useState } from 'react'

import { MetadataDataType } from 'helpers/metaplex'
import useOwnerNFT from './useOwnerNFT'

const useOwnerNftByCollection = (ownerPublickey: string) => {
  const { nfts } = useOwnerNFT(ownerPublickey)
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
