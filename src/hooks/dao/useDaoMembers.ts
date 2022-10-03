import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from 'model'
import { getTokenHolders } from 'model/tokenHolder.controller'
import { DataLoader } from '@sen-use/web3/dist'

export const useDaoMembers = (daoAddress: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const [members, setMembers] = useState<number>()

  const fetchDaoMember = useCallback(async () => {
    const data = await DataLoader.load('load-dao-memmber', () =>
      dispatch(getTokenHolders({ daoAddress })).unwrap(),
    )
    const members = data[daoAddress] || 0
    return setMembers(members)
  }, [daoAddress, dispatch])

  useEffect(() => {
    fetchDaoMember()
  }, [fetchDaoMember])

  return members
}
