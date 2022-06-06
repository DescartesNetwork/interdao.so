import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { DaoData } from '@interdao/core'
import { useAccount, useWallet } from '@senhub/providers'

import { AppState } from 'app/model'
import { isNftBelongsToCollection } from 'app/helpers/metaplex'
import useMetaData from 'app/hooks/useMetaData'

const useCheckMemberOnly = (daoAddress: string) => {
  const daos = useSelector((state: AppState) => state.dao.daos)

  const { mint, isPublic, isNft } = daos[daoAddress] || ({} as DaoData)
  const { accounts } = useAccount()
  const metaData = useMetaData(daoAddress)
  const [isMemberOnly, setIsMemberOnly] = useState(false)
  const [loadingDaoMetadata, setLoadingDaoMetadata] = useState(true)
  const {
    wallet: { address: myAddress },
  } = useWallet()

  const checkMemberOnlyNFT = useCallback(async () => {
    let valid = false
    for (const accountAddr in accounts) {
      let isMemnberOnly = await isNftBelongsToCollection(
        accounts[accountAddr].mint,
        mint.toBase58(),
      )
      if (isMemnberOnly) {
        valid = true
        break
      }
    }
    return valid
  }, [accounts, mint])

  const checkMemberOnlyToken = useCallback(async () => {
    const mints = []
    for (const accountAddr in accounts) mints.push(accounts[accountAddr].mint)
    return mints.includes(mint.toBase58())
  }, [accounts, mint])

  const checkMemberOnlyMultisigDao = useCallback(async () => {
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

  const checkDaoMember = useCallback(async () => {
    if (isPublic) return true
    if (!metaData) return setLoadingDaoMetadata(true)
    const { daoType } = metaData

    let isMemberOnly: boolean = false
    if (daoType === 'flexible-dao') {
      if (isNft) isMemberOnly = await checkMemberOnlyNFT()
      else isMemberOnly = await checkMemberOnlyToken()
    }
    if (daoType === 'multisig-dao') {
      isMemberOnly = await checkMemberOnlyMultisigDao()
    }
    setIsMemberOnly(isMemberOnly)
    setLoadingDaoMetadata(false)
  }, [
    isNft,
    isPublic,
    metaData,
    checkMemberOnlyMultisigDao,
    checkMemberOnlyNFT,
    checkMemberOnlyToken,
  ])

  useEffect(() => {
    checkDaoMember()
  }, [checkDaoMember])

  return {
    isMemberOnly,
    loadingDaoMetadata,
  }
}

export default useCheckMemberOnly
