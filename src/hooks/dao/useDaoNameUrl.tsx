import useMetaData from 'hooks/useMetaData'
import { useMemo } from 'react'

const useDaoNameUrl = (daoAddress: string) => {
  const { metaData } = useMetaData(daoAddress)

  const daoNameUrl = useMemo(() => {
    if (!metaData?.daoName) return ''
    let daoName = metaData.daoName
    let nameUrl = ''
    for (const char of daoName) {
      if (char === ' ') {
        nameUrl += '-'
        continue
      }
      nameUrl += char
    }
    return nameUrl.toLocaleLowerCase()
  }, [metaData])

  return { daoNameUrl }
}

export default useDaoNameUrl
