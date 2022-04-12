import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { AppDispatch, AppState } from 'app/model'
import { getMember, MetaData } from 'app/model/metadata.controller'

const useMembers = (daoAddress: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const { metadata, dao } = useSelector((state: AppState) => state)

  const { members } = useMemo(
    () => metadata[daoAddress] || ({} as MetaData),
    [daoAddress, metadata],
  )
  const isExistDao = useMemo(() => {
    return !!Object.keys(dao).length
  }, [dao])

  useEffect(() => {
    if (isExistDao && account.isAddress(daoAddress)) {
      dispatch(getMember({ daoAddress }))
    }
  }, [dispatch, daoAddress, isExistDao])

  return members || 0
}

export default useMembers
