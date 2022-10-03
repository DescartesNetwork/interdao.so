import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { DaoData } from '@interdao/core'

import { AppDispatch, AppState } from 'model'
import { getDao } from 'model/daos.controller'

export const useDaoData = (daoAddress: string): DaoData | undefined => {
  const dispatch = useDispatch<AppDispatch>()
  const daoData = useSelector((state: AppState) => state.daos[daoAddress])

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
