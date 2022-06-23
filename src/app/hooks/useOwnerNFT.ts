import { useCallback, useEffect, useState } from 'react'
import { useAccount } from '@senhub/providers'
import { utils, web3, BN } from '@project-serum/anchor'

import { fetchYourOwnerNTFs, MetadataDataType } from 'app/helpers/metaplex'
import { DataLoader } from 'shared/dataloader'

const useOwnerNFT = (ownerPublickey: string) => {
  const [nfts, setNfts] = useState<MetadataDataType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>()
  const { accounts } = useAccount()

  const fetchNFTs = useCallback(async () => {
    if (!ownerPublickey) return setNfts([])
    setLoading(true)
    try {
      const nftsFetching = await DataLoader.load(
        'fetchYourOwnerNTFs' + ownerPublickey,
        () => fetchYourOwnerNTFs(ownerPublickey),
      )
      let nftsFiltered: MetadataDataType[] = []
      await Promise.all(
        nftsFetching.map(async (nft: MetadataDataType) => {
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
      // const nftsFetching = await fetchYourOwnerNTFs(ownerPublickey)
      setNfts(nftsFiltered)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [accounts, ownerPublickey])

  useEffect(() => {
    fetchNFTs()
  }, [fetchNFTs])

  return { nfts, loading, error }
}

export default useOwnerNFT
