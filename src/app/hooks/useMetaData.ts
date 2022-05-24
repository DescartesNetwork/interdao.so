import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { MetaData } from 'app/model/metadata.controller'
import { AppState } from 'app/model'
import { cacheDaoData } from 'app/helpers'
import { DaoData } from '@interdao/core'
import { account } from '@senswap/sen-js'

const useMetaData = (daoAddress: string) => {
  const {
    dao: { daoData },
  } = useSelector((state: AppState) => state)
  const [metaData, setMetaData] = useState<MetaData & DaoData>()

  const getMetaData = useCallback(async () => {
    if (!account.isAddress(daoAddress)) return setMetaData(undefined)
    const data: DaoData & MetaData = await cacheDaoData(
      daoAddress,
      daoData[daoAddress],
    )
    setMetaData(data)
  }, [daoAddress, daoData])

  useEffect(() => {
    getMetaData()
  }, [getMetaData])

  return metaData
}

export default useMetaData
