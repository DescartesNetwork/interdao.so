import { useSelector } from 'react-redux'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount, useMint, useWallet } from '@senhub/providers'
import { DaoData } from '@interdao/core'

import { AppState } from 'app/model'
import { isNftBelongsToCollection } from 'app/helpers/metaplex'
import useMetaData from 'app/hooks/useMetaData'

const useDaoMemberOnly = (daoAddress: string) => {
  const daos = useSelector((state: AppState) => state.daos)
  const { mint: daoMint, isNft } = daos[daoAddress] || ({} as DaoData)
  const { accounts } = useAccount()
  const { metaData } = useMetaData(daoAddress)
  const [validMember, setValidMember] = useState(false)
  const [checking, setChecking] = useState(true)
  const {
    wallet: { address: myAddress },
  } = useWallet()
  const { getDecimals } = useMint()

  const checkMemberOnlyNFT = useCallback(async () => {
    for (const { mint: mintAddress } of Object.values(accounts)) {
      try {
        const decimals = await getDecimals(mintAddress)
        if (decimals) continue
      } catch (error) {
        const isMemberOnly = await isNftBelongsToCollection(
          mintAddress,
          daoMint.toBase58(),
        )
        if (isMemberOnly) return isMemberOnly
      }
    }
    return false
  }, [accounts, daoMint, getDecimals])

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

  const checkDaoMember = useCallback(async () => {
    if (!metaData || !daoMint) return setChecking(true)
    const { daoType } = metaData
    let valid = false
    if (daoType === 'flexible-dao' && isNft) valid = await checkMemberOnlyNFT()

    if (daoType === 'flexible-dao' && !isNft) valid = isMemberTokenDAO

    if (daoType === 'multisig-dao') valid = isMemberMultisig

    console.log('daoAddress: ', metaData.daoName, valid)

    setValidMember(valid)
    setChecking(false)
  }, [
    metaData,
    daoMint,
    isNft,
    checkMemberOnlyNFT,
    isMemberTokenDAO,
    isMemberMultisig,
  ])

  useEffect(() => {
    checkDaoMember()
  }, [checkDaoMember])

  return { validMember, checking }
}

export default useDaoMemberOnly
