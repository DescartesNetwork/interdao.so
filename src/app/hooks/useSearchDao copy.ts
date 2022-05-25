import { useCallback, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'

import DaoProvider, {
  RegisterDaoData,
} from 'app/view/dao/daoList/search/daoProvider copy'
import LocalMetadata from 'app/helpers/localMetadata'

const useSearchDao = (keyword: string, daoAddresses: string[]) => {
  const [metaData, setMetaData] = useState<RegisterDaoData>()
  const [searchData, setSearchData] = useState<string[]>()
  const [loading, setLoading] = useState(false)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const getMetaData = useCallback(async () => {
    const nextData: RegisterDaoData = {}
    for (const daoAddress of daoAddresses) {
      const localMetadata = new LocalMetadata(daoAddress, walletAddress)
      const data = await localMetadata.get()
      if (!data) continue
      nextData[daoAddress] = { ...data, daoAddress }
    }
    return setMetaData(nextData)
  }, [daoAddresses, walletAddress])

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
