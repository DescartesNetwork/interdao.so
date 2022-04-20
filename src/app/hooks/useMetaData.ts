import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { MetaData } from 'app/view/dao/daoInitialization/metaDataForm'
import { getCID } from 'app/helpers'
import IPFS from 'shared/pdb/ipfs'

const useMetaData = (daoAddress: string) => {
  const { dao } = useSelector((state: AppState) => state)
  const [metaData, setMetaData] = useState<MetaData>()
  const { metadata: digest } = dao?.[daoAddress]

  const getMetaData = useCallback(async () => {
    if (!digest) return
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
