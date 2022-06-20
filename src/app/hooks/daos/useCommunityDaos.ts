import { utils, web3 } from '@project-serum/anchor'
import { useAccount, useWallet } from '@senhub/providers'
import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'

import { AppState } from 'app/model'
import { DaoState } from 'app/model/daos.controller'

const useCommunityDaos = (): DaoState => {
  const daos = useSelector((state: AppState) => state.daos)
  const [filteredDaos, setFilteredDaos] = useState<DaoState>({})
  const { accounts } = useAccount()
  const { wallet } = useWallet()

  const filterDaos = useCallback(async () => {
    const filteredDaos: DaoState = {}
    for (const addr in daos) {
      const { mint, isPublic } = daos[addr]
      if (!isPublic) {
        const tokenAccount = await utils.token.associatedAddress({
          mint,
          owner: new web3.PublicKey(wallet.address),
        })
        const amount = accounts[tokenAccount.toBase58()]?.amount
        if (!(Number(amount.toString()) > 0)) continue
      }
      filteredDaos[addr] = daos[addr]
    }
    return setFilteredDaos(filteredDaos)
  }, [accounts, daos, wallet.address])

  useEffect(() => {}, [filterDaos])

  return filteredDaos
}
export default useCommunityDaos
