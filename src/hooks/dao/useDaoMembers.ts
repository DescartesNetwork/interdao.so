import { useDaoData } from 'hooks/dao'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { net } from '@sentre/senhub'

import { AppDispatch } from 'model'
import { fetchTokenHolders } from 'helpers/tokenHolders'
import { getTokenHolders } from 'model/tokenHolder.controller'

export const useDaoMembers = (daoAddress: string): number => {
  const dispatch = useDispatch<AppDispatch>()
  const daoData = useDaoData(daoAddress)
  const [members, setMembers] = useState(0)

  const fetchDaoMemberFromSolScan = useCallback(async () => {
    const mintAddr = daoData?.mint.toBase58() || ''
    const members = await fetchTokenHolders(mintAddr)

    setMembers(members)
  }, [daoData?.mint])

  const fecthDaoMemberFromStore = useCallback(async () => {
    const data = await dispatch(getTokenHolders({ daoAddress })).unwrap()
    const members = data[daoAddress] || 0

    setMembers(members)
  }, [daoAddress, dispatch])

  useEffect(() => {
    if (daoData && net === 'mainnet') fetchDaoMemberFromSolScan()
    if (daoData && net === 'devnet') fecthDaoMemberFromStore()
  }, [daoData, fecthDaoMemberFromStore, fetchDaoMemberFromSolScan])

  return members
}
