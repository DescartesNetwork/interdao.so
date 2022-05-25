import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { AppDispatch, AppState } from 'app/model'
import { getMember } from 'app/model/metadata.controller'

const useMembers = (daoAddress: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    metadata: { tokenHolders },
    dao: { daoData },
  } = useSelector((state: AppState) => state)

  const amountHolder = useMemo(
    () => tokenHolders[daoAddress],
    [daoAddress, tokenHolders],
  )
  const isExistDao = useMemo(() => {
    return !!Object.keys(daoData).length
  }, [daoData])

  useEffect(() => {
    if (isExistDao && account.isAddress(daoAddress))
      dispatch(getMember({ daoAddress }))
  }, [dispatch, daoAddress, isExistDao])

  return amountHolder || 0
}

export default useMembers
