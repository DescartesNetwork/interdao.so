import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAccounts, useWalletAddress } from '@sentre/senhub'
import { utils, web3 } from '@project-serum/anchor'

import usePDB from '../usePDB'
import { AppState } from 'model'
import { MetaData } from 'model/createDao.controller'
import useOwnerNFT from '../useOwnerNFT'

const useAvailableDaos = () => {
  const daos = useSelector((state: AppState) => state.daos)
  const [filteredDaos, setFilteredDaos] = useState<string[]>()
  const accounts = useAccounts()
  const walletAddress = useWalletAddress()
  const { nfts } = useOwnerNFT(walletAddress)
  const pdb = usePDB()

  const filterDaos = useCallback(async () => {
    if (!nfts) return setFilteredDaos(undefined)
    const filteredDaos: string[] = []
    try {
      for (const addr in daos) {
        const daoData = daos[addr]
        const { mint, isNft } = daoData
        let valid = true

        // Validate MultisigDAO
        const { daoType, members } = (await pdb.getItem(addr)) as MetaData

        if (daoType === 'multisig-dao') {
          const listMember = members.map(({ walletAddress }) => walletAddress)
          if (!listMember.includes(walletAddress)) valid = false
        }

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
  }, [accounts, daos, nfts, pdb, walletAddress])

  useEffect(() => {
    filterDaos()
  }, [filterDaos])

  return filteredDaos
}

export default useAvailableDaos
