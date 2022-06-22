import { useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount, useWallet } from '@senhub/providers'
import { DaoData } from '@interdao/core'

import { AppState } from 'app/model'
import useMetaData from 'app/hooks/useMetaData'
import useOwnerNFT from '../useOwnerNFT'

const useValidDaoMember = (daoAddress: string) => {
  const daos = useSelector((state: AppState) => state.daos)
  const { accounts } = useAccount()

  const { mint: daoMint, isNft } = daos[daoAddress] || ({} as DaoData)
  const { metaData } = useMetaData(daoAddress)
  const [validMember, setValidMember] = useState(false)
  const [checking, setChecking] = useState(true)
  const {
    wallet: { address: myAddress },
  } = useWallet()
  const { nfts } = useOwnerNFT(myAddress)

  const isMemberOnlyNFT = useMemo(() => {
    if (!nfts) return false
    for (const nft of nfts)
      if (nft.collection?.key === daoMint.toBase58()) return true
    return false
  }, [daoMint, nfts])

  const isMemberTokenDAO = useMemo(() => {
    if (!daoMint) return false
    const mints = []
    for (const { mint } of Object.values(accounts)) mints.push(mint)
    return mints.includes(daoMint.toBase58())
  }, [accounts, daoMint])

  const isMemberMultisig = useMemo(() => {
    if (!metaData) return false
    const { members } = metaData
    let valid = false
    for (const { walletAddress } of members)
      if (walletAddress === myAddress) {
        valid = true
        break
      }
    return valid
  }, [metaData, myAddress])

  const checkDaoMember = useCallback(() => {
    if (!metaData || !daoMint) return setChecking(true)
    const { daoType } = metaData
    let valid = false
    if (daoType === 'flexible-dao' && isNft) valid = isMemberOnlyNFT

    if (daoType === 'flexible-dao' && !isNft) valid = isMemberTokenDAO

    if (daoType === 'multisig-dao') valid = isMemberMultisig

    setValidMember(valid)
    setChecking(false)
  }, [
    metaData,
    daoMint,
    isNft,
    isMemberOnlyNFT,
    isMemberTokenDAO,
    isMemberMultisig,
  ])

  useEffect(() => {
    checkDaoMember()
  }, [checkDaoMember])

  return { validMember, checking }
}

export default useValidDaoMember
