import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccounts, useWalletAddress } from '@sentre/senhub'

import { useDaoMetaData } from 'hooks/dao/useDaoMetaData'
import useOwnerNFT from '../useOwnerNFT'
import { useDaoData } from './useDaoData'

const useValidDaoMember = (daoAddress: string) => {
  const [validMember, setValidMember] = useState(false)
  const [checking, setChecking] = useState(true)
  const accounts = useAccounts()
  const daoData = useDaoData(daoAddress)
  const metaData = useDaoMetaData(daoAddress)
  const myAddress = useWalletAddress()

  const { nfts } = useOwnerNFT(myAddress)

  const isMemberOnlyNFT = useMemo(() => {
    if (!nfts || !daoData?.mint) return false
    for (const nft of nfts)
      if (nft.collection?.key === daoData.mint.toBase58()) return true

    return false
  }, [daoData?.mint, nfts])

  const isMemberTokenDAO = useMemo(() => {
    if (!daoData?.mint) return false
    const mints = []
    for (const { mint } of Object.values(accounts)) mints.push(mint)
    return mints.includes(daoData?.mint.toBase58())
  }, [daoData?.mint, accounts])

  const checkDaoMember = useCallback(() => {
    if (!metaData || !daoData?.mint) return setChecking(true)
    const { daoType } = metaData
    let valid = false
    if (daoType === 'flexible-dao' && daoData?.isNft) valid = isMemberOnlyNFT

    if (daoType === 'flexible-dao' && !daoData?.isNft) valid = isMemberTokenDAO

    setValidMember(valid)
    setChecking(false)
  }, [
    daoData?.isNft,
    daoData?.mint,
    isMemberOnlyNFT,
    isMemberTokenDAO,
    metaData,
  ])

  useEffect(() => {
    checkDaoMember()
  }, [checkDaoMember])

  return { validMember, checking }
}

export default useValidDaoMember
