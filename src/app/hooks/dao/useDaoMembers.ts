import { useDaoData } from 'app/hooks/dao'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from 'app/model'
import { getTokenHolders } from 'app/model/tokenHolder.controller'

export const useDaoMembers = (daoAddress: string): number => {
  const dispatch = useDispatch<AppDispatch>()
  const daoData = useDaoData(daoAddress)
  const [members, setMembers] = useState(0)

  const fetchDaoMember = useCallback(async () => {
    const data = await dispatch(getTokenHolders({ daoAddress })).unwrap()
    const members = data[daoAddress] || 0
    setMembers(members)
  }, [daoAddress, dispatch])

  useEffect(() => {
    if (daoData) fetchDaoMember()
  }, [daoData, fetchDaoMember])

  return members
}
