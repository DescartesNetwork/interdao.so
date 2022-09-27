import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAccounts, useWalletAddress } from '@sentre/senhub'
import { utils, web3 } from '@project-serum/anchor'

import { AppState } from 'model'
import { ipfs } from 'helpers/ipfs'
import useOwnerNFT from '../useOwnerNFT'

const useAvailableDaos = () => {
  const daos = useSelector((state: AppState) => state.daos)
  const [filteredDaos, setFilteredDaos] = useState<string[]>()
  const accounts = useAccounts()
  const walletAddress = useWalletAddress()
  const { nfts } = useOwnerNFT(walletAddress)

  const filterDaos = useCallback(async () => {
    if (!nfts) return setFilteredDaos(undefined)
    const filteredDaos: string[] = []
    try {
      for (const addr in daos) {
        const { mint, isNft, metadata } = daos[addr]
        const { daoType } = await ipfs.methods.daoMetadata.get(metadata)
        let valid = true

        if (daoType === 'flexible-dao' && !isNft) {
          const tokenAccount = await utils.token.associatedAddress({
            mint,
            owner: new web3.PublicKey(walletAddress),
          })
          if (!accounts[tokenAccount.toBase58()]) valid = false
        }
        if (daoType === 'flexible-dao' && isNft) {
          const myCollections = nfts?.map((nft) => nft.collection?.key)
          if (!myCollections || !myCollections.includes(mint.toBase58()))
            valid = false
        }

        if (valid) filteredDaos.push(addr)
      }
    } catch (error) {}
    return setFilteredDaos(filteredDaos)
  }, [accounts, daos, nfts, walletAddress])

  useEffect(() => {
    filterDaos()
  }, [filterDaos])

  return filteredDaos
}

export default useAvailableDaos
