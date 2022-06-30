import { useCallback, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'

import DaoProvider, {
  RegisterDaoData,
} from 'view/dao/publicDaos/search/daoProvider'
import usePDB from './usePDB'
import { MetaData } from 'model/createDao.controller'

const useSearchDao = (keyword: string, daoAddresses: string[]) => {
  const [metaData, setMetaData] = useState<RegisterDaoData>()
  const [searchData, setSearchData] = useState<string[]>()
  const [loading, setLoading] = useState(false)
  const pdb = usePDB()

  const getMetaData = useCallback(async () => {
    const nextData: RegisterDaoData = {}
    for (const daoAddress of daoAddresses) {
      const data = (await pdb.getItem(daoAddress)) as MetaData
      if (!data) continue
      nextData[daoAddress] = { ...data, daoAddress }
    }
    return setMetaData(nextData)
  }, [daoAddresses, pdb])

  const onSearch = useCallback(async () => {
    if (!keyword || keyword.length < 3 || keyword === 'all-regime' || !metaData)
      return setSearchData(undefined)
    try {
      const daoProvider = new DaoProvider(metaData)
      if (account.isAddress(keyword)) {
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
