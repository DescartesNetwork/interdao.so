import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAccount, useWallet } from '@senhub/providers'
import { utils, web3 } from '@project-serum/anchor'

import usePDB from '../usePDB'
import { AppState } from 'app/model'
import { DaoState } from 'app/model/daos.controller'
import { MetaData } from 'app/model/createDao.controller'

const useDaoCanJoin = () => {
  const daos = useSelector((state: AppState) => state.daos)
  const [filteredDaos, setFilteredDaos] = useState<DaoState>({})
  const { accounts } = useAccount()
  const { wallet } = useWallet()
  const pdb = usePDB()

  const filterDaos = useCallback(async () => {
    const filteredDaos: DaoState = {}
    try {
      for (const addr in daos) {
        const daoData = daos[addr]
        const { mint } = daoData
        let valid = true

        // Validate MultisigDAO
        const { daoType, members } = (await pdb.getItem(addr)) as MetaData

        if (daoType === 'multisig-dao') {
          const listMember = members.map(({ walletAddress }) => walletAddress)
          if (!listMember.includes(wallet.address)) valid = false
        }

        if (daoType === 'flexible-dao') {
          const tokenAccount = await utils.token.associatedAddress({
            mint,
            owner: new web3.PublicKey(wallet.address),
          })
          const amount = accounts[tokenAccount.toBase58()]?.amount
          if (!amount || !(Number(amount.toString()) > 0)) valid = false
        }

        if (valid) filteredDaos[addr] = daoData
      }
    } catch (error) {}
    return setFilteredDaos(filteredDaos)
  }, [accounts, daos, pdb, wallet.address])

  useEffect(() => {
    filterDaos()
  }, [filterDaos])

  return filteredDaos
}

export default useDaoCanJoin
