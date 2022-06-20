import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { utils, web3 } from '@project-serum/anchor'
import { useAccount, useWallet } from '@senhub/providers'

import { AppState } from 'app/model'
import { DaoState } from 'app/model/daos.controller'
import usePDB from '../usePDB'
import { MetaData } from 'app/model/createDao.controller'

const useCommunityDaos = (
  daoType: string,
  mechanismsType: string,
): DaoState => {
  const daos = useSelector((state: AppState) => state.daos)
  const [filteredDaos, setFilteredDaos] = useState<DaoState>({})
  const { accounts } = useAccount()
  const { wallet } = useWallet()
  const pdb = usePDB()

  const filterDaos = useCallback(async () => {
    const filteredDaos: DaoState = {}

    for (const addr in daos) {
      const daoData = daos[addr]
      const { isPublic, mint, regime } = daoData
      let valid = true
      // Validate vote token
      if (!isPublic) {
        const tokenAccount = await utils.token.associatedAddress({
          mint,
          owner: new web3.PublicKey(wallet.address),
        })
        const amount = accounts[tokenAccount.toBase58()]?.amount
        if (!amount || !(Number(amount.toString()) > 0)) valid = false
      }
      // Validate type
      if (daoType !== 'all') {
        const metaData = (await pdb.getItem(addr)) as MetaData
        if (metaData?.daoType !== daoType) valid = false
      }
      // Validate Regime
      if (mechanismsType !== 'all') {
        const parseRegime = Object.keys(regime)[0]
        if (parseRegime !== mechanismsType) valid = false
      }

      if (valid) filteredDaos[addr] = daoData
    }
    return setFilteredDaos(filteredDaos)
  }, [accounts, daoType, daos, mechanismsType, pdb, wallet.address])

  useEffect(() => {
    filterDaos()
  }, [filterDaos])

  return filteredDaos
}
export default useCommunityDaos
