import { useCallback, useEffect, useState } from 'react'

import useMetaData from 'hooks/useMetaData'

const useDaoNameUrl = (daoAddress: string) => {
  const { metaData } = useMetaData(daoAddress)
  const [daoNameUrl, setDaoNameUrl] = useState<string>()

  const loadDaoName = useCallback(() => {
    if (!metaData?.daoName) return
    const daoName = metaData.daoName.replace(/ /g, '-').toLocaleLowerCase()
    return setDaoNameUrl(daoName)
  }, [metaData?.daoName])
  useEffect(() => {
    loadDaoName()
  }, [loadDaoName])

  return { daoNameUrl }
}

export default useDaoNameUrl
