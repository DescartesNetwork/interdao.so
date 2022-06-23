import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { AppDispatch, AppState } from 'app/model'
import { getDao } from 'app/model/daos.controller'
import { DaoData } from '@interdao/core'

export const useDaoData = (daoAddress: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const daoData: DaoData | undefined = useSelector(
    (state: AppState) => state.daos[daoAddress],
  )

  useEffect(() => {
    if (daoData) return
    try {
      dispatch(getDao({ address: daoAddress })).unwrap()
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
    }
  }, [daoAddress, daoData, dispatch])

  return daoData
}
