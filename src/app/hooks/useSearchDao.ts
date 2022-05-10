import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { DaoData } from '@interdao/core'

import { parseDaoData } from 'app/helpers'
import { AppState } from 'app/model'
import { MetaData } from 'app/model/metadata.controller'
import DaoProvider from 'app/view/dao/daoList/search/daoProvider'
import { DaoDataState } from 'app/model/dao.controller'

const useSearchDao = (keyword?: string, data?: DaoDataState) => {
  const [parseData, setParseData] = useState<
    Record<string, DaoData & MetaData> | undefined
  >()
  const [searchData, setSearchData] = useState<string[]>()
  const [loading, setLoading] = useState(false)
  const {
    dao: { daoData },
  } = useSelector((state: AppState) => state)

  const daoProvider = useMemo(() => {
    if (!parseData) return
    return new DaoProvider(parseData)
  }, [parseData])

  const onParseDaoData = useCallback(async () => {
    let parseData: Record<string, DaoData & MetaData> | undefined = undefined
    if (data) parseData = await parseDaoData(data)
    else parseData = await parseDaoData(daoData)
    setParseData(parseData)
  }, [daoData, data])

  const onSearch = useCallback(async () => {
    if (
      !keyword ||
      keyword.length < 3 ||
      !daoProvider ||
      keyword === 'all-regime'
    )
      return setSearchData(undefined)
    try {
      if (account.isAddress(keyword)) {
        const data = await daoProvider.findByAddress(keyword)
        return setSearchData(data)
      }
      const data = await daoProvider.find(keyword)
      return setSearchData(data)
    } catch (err) {
      setSearchData(undefined)
    }
  }, [daoProvider, keyword])

  useEffect(() => {
    onParseDaoData()
  }, [onParseDaoData])

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
