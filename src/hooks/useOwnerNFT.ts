import { useCallback, useEffect, useState } from 'react'
import { useAccount } from '@sentre/senhub'
import { utils, web3, BN } from '@project-serum/anchor'

import { fetchYourOwnerNTFs, MetadataDataType } from 'helpers/metaplex'
import { DataLoader } from '@sentre/senhub'

const useOwnerNFT = (ownerPublickey: string) => {
  const [nfts, setNfts] = useState<MetadataDataType[]>()
  const [nftsFiltered, setNftFiltered] = useState<MetadataDataType[]>()
  const { accounts } = useAccount()

  const fetchNFTs = useCallback(async () => {
    if (!ownerPublickey) return setNfts(undefined)
    const nftsFetching = await DataLoader.load(
      'fetchYourOwnerNTFs' + ownerPublickey,
      () => fetchYourOwnerNTFs(ownerPublickey),
    )
    setNfts(nftsFetching)
  }, [ownerPublickey])

  useEffect(() => {
    fetchNFTs()
  }, [fetchNFTs])

  const filterNFTs = useCallback(async () => {
    if (!nfts) return setNftFiltered(undefined)
    let nftsFiltered: MetadataDataType[] = []
    await Promise.all(
      nfts.map(async (nft: MetadataDataType) => {
        const nftTokenAccount = await utils.token.associatedAddress({
          mint: new web3.PublicKey(nft.mint),
          owner: new web3.PublicKey(ownerPublickey),
        })
        let nftAccountData = accounts[nftTokenAccount.toBase58()]
        if (new BN(nftAccountData?.amount.toString()).eq(new BN(1))) {
          nftsFiltered.push(nft)
        }
      }),
    )
    return setNftFiltered(nftsFiltered)
  }, [accounts, nfts, ownerPublickey])

  useEffect(() => {
    filterNFTs()
  }, [filterNFTs])

  return { nfts: nftsFiltered }
}

export default useOwnerNFT
