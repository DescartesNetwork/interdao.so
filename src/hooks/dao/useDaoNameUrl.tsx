import { useCallback, useEffect, useState } from 'react'

import useMetaData from 'hooks/useMetaData'

export const deriveDaoNameURL = (daoName: string) =>
  daoName.replace(/[\W_]+/gm, '-').toLocaleLowerCase()

const useDaoNameUrl = (daoAddress: string) => {
  const { metaData } = useMetaData(daoAddress)
  const [daoNameUrl, setDaoNameUrl] = useState<string>()

  const loadDaoName = useCallback(() => {
    if (!metaData?.daoName) return
    const daoName = deriveDaoNameURL(metaData.daoName)
    return setDaoNameUrl(daoName)
  }, [metaData?.daoName])
  useEffect(() => {
    loadDaoName()
  }, [loadDaoName])

  return { daoNameUrl }
}

export default useDaoNameUrl
