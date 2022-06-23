import { useDispatch } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { DaoData } from '@interdao/core'

import { AppDispatch } from 'app/model'
import { getDao } from 'app/model/daos.controller'
import { DataLoader } from 'shared/dataloader'

export const useDaoData = (daoAddress?: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const [daoData, setDaoData] = useState<DaoData>()

  const fetchDaoData = useCallback(
    async (daoAddress: string) => {
      try {
        const keyLoader = 'useDaoData:fetchDaoData:' + daoAddress
        const data = await DataLoader.load(keyLoader, () =>
          dispatch(getDao({ address: daoAddress })).unwrap(),
        )
        const daoData = data[daoAddress]
        setDaoData(daoData)
      } catch (er: any) {
        return window.notify({ type: 'error', description: er.message })
      }
    },
    [dispatch],
  )
  useEffect(() => {
    if (daoAddress) fetchDaoData(daoAddress)
  }, [daoAddress, fetchDaoData])

  return { daoData, fetchDaoData }
}
