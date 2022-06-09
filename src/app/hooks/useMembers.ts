import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { AppDispatch, AppState } from 'app/model'
import { getTokenHolders } from 'app/model/tokenHolder.controller'

const useMembers = (daoAddress: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const daos = useSelector((state: AppState) => state.daos)
  const tokenHolder = useSelector((state: AppState) => state.tokenHolder)

  const amountHolder = useMemo(
    () => tokenHolder[daoAddress],
    [daoAddress, tokenHolder],
  )
  const isExistDao = useMemo(() => {
    return !!Object.keys(daos).length
  }, [daos])

  useEffect(() => {
    if (isExistDao && account.isAddress(daoAddress))
      dispatch(getTokenHolders({ daoAddress }))
  }, [dispatch, daoAddress, isExistDao])

  return amountHolder || 0
}

export default useMembers
