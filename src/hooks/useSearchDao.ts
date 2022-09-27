import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { util } from '@sentre/senhub'

import DaoProvider, {
  RegisterDaoData,
} from 'view/dao/publicDaos/search/daoProvider'
import { ipfs } from 'helpers/ipfs'
import { AppState } from 'model'

const useSearchDao = (keyword: string, daoAddresses: string[]) => {
  const daos = useSelector((state: AppState) => state.daos)
  const [metaData, setMetaData] = useState<RegisterDaoData>()
  const [searchData, setSearchData] = useState<string[]>()
  const [loading, setLoading] = useState(false)

  const getMetaData = useCallback(async () => {
    const nextData: RegisterDaoData = {}
    await Promise.all(
      daoAddresses.map(async (daoAddress) => {
        const daoData = daos[daoAddress]
        const data = await ipfs.methods.daoMetadata.get(daoData.metadata)
        nextData[daoAddress] = { ...data, daoAddress }
      }),
    )
    return setMetaData(nextData)
  }, [daoAddresses, daos])

  const onSearch = useCallback(async () => {
    if (!keyword || keyword.length < 3 || keyword === 'all-regime' || !metaData)
      return setSearchData(undefined)
    try {
      const daoProvider = new DaoProvider(metaData)
      if (util.isAddress(keyword)) {
        const data = await daoProvider.findByAddress(keyword)
        return setSearchData(data)
      }
      const data = await daoProvider.find(keyword)
      return setSearchData(data)
    } catch (err) {
      setSearchData(undefined)
    }
  }, [keyword, metaData])

  useEffect(() => {
    getMetaData()
  }, [getMetaData])

  useEffect(() => {
    if (keyword && keyword.length >= 3) setLoading(true)
    const delayToSearch = setTimeout(async () => {
      //  delay to waiting keyboard typing
      await onSearch()
      setLoading(false)
    }, 500)
    return () => clearTimeout(delayToSearch)
  }, [keyword, onSearch])

  return { searchData, loading }
}

export default useSearchDao
