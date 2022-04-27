import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import LazyLoad from '@senswap/react-lazyload'

import { Col, Row } from 'antd'
import DaoCard from './daoCard'
import SearchDao from './search'
import SortDao from './sortDao'
import DaoProvider from './search/daoProvider'

import { AppState } from 'app/model'
import { DaoDataState } from 'app/model/dao.controller'

import './index.less'

const DaoList = () => {
  const [sortKey, setSortKey] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [filterDao, setFilterDao] = useState<DaoDataState>()
  const {
    dao: { daoData },
  } = useSelector((state: AppState) => state)
  const daoProvider = useMemo(() => {
    if (!Object.keys(daoData).length) return
    return new DaoProvider(daoData)
  }, [daoData])

  const onSearch = useCallback(async () => {
    if (!daoProvider) return
    if (searchKey?.length < 3) return setFilterDao(undefined)
    if (account.isAddress(searchKey)) {
      const daoData = await daoProvider.findByAddress(searchKey)
      if (daoData) return setFilterDao({ [searchKey]: daoData })
      return setFilterDao(undefined)
    }
    const result = await daoProvider.find(searchKey)
    return setFilterDao(result)
  }, [daoProvider, searchKey])

  useEffect(() => {
    onSearch()
  }, [onSearch])

  console.log(sortKey)
  return (
    <Row gutter={[24, 16]}>
      <Col xs={24} md={12}>
        <Row gutter={[24, 24]}>
          <Col>
            <SortDao onSort={setSortKey} />
          </Col>
          <Col flex="auto">
            <SearchDao onSearch={setSearchKey} />
          </Col>
        </Row>
      </Col>
      <Col span={24} />
      {Object.keys(filterDao || daoData).map((daoAddress) => (
        <Col key={daoAddress} xs={24} md={12}>
          <LazyLoad height={350.88}>
            <DaoCard daoAddress={daoAddress} special />
          </LazyLoad>
        </Col>
      ))}
    </Row>
  )
}

export default DaoList
