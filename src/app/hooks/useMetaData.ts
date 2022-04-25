import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IPFS from 'shared/pdb/ipfs'

import { MetaData } from 'app/model/metadata.controller'
import { AppState } from 'app/model'
import { getCID } from 'app/helpers'

const useMetaData = (daoAddress: string) => {
  const {
    dao: { daoData },
  } = useSelector((state: AppState) => state)
  const [metaData, setMetaData] = useState<MetaData>()
  const { metadata: digest } = daoData?.[daoAddress] || {}

  const getMetaData = useCallback(async () => {
    if (!digest) return setMetaData(undefined)
    const cid = getCID(digest)
    const ipfs = new IPFS()
    const data = await ipfs.get(cid)
    setMetaData(data)
  }, [digest])

  useEffect(() => {
    getMetaData()
  }, [getMetaData])

  return metaData
}

export default useMetaData
