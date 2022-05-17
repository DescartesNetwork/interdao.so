import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { MetaData } from 'app/model/metadata.controller'
import { AppState } from 'app/model'
import { cacheDaoData } from 'app/helpers'
import { DaoData } from '@interdao/core'

const useMetaData = (daoAddress: string) => {
  const {
    dao: { daoData },
  } = useSelector((state: AppState) => state)
  const [metaData, setMetaData] = useState<MetaData>()

  const getMetaData = useCallback(async () => {
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
