import { useCallback, useEffect, useState } from 'react'
import { useAccount } from '@senhub/providers'
import { utils, web3, BN } from '@project-serum/anchor'

import { fetchYourOwnerNTFs, MetadataDataType } from 'app/helpers/metaplex'

const useOwerNFT = (ownerPublickey: string) => {
  const [nfts, setNfts] = useState<MetadataDataType[]>([])
  const [nftsFiltered, setNftFiltered] = useState<MetadataDataType[]>()
  const { accounts } = useAccount()

  const fetchNFTs = useCallback(async () => {
    if (!ownerPublickey) return setNfts([])
    const nftsFetching = await fetchYourOwnerNTFs(ownerPublickey)
    setNfts(nftsFetching)
  }, [ownerPublickey])

  useEffect(() => {
    fetchNFTs()
  }, [fetchNFTs])

  const filterNFTs = useCallback(async () => {
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

export default useOwerNFT
