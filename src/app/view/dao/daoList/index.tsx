import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import LazyLoad from '@senswap/react-lazyload'
import { DaoData } from '@interdao/core'

import { Col, Row } from 'antd'
import DaoCard from './daoCard'
import SearchDao from './search'
import SortDao from './sortDao'

import { AppState } from 'app/model'
import useSearchDao from 'app/hooks/useSearchDao'
import { useUI } from '@senhub/providers'

import './index.less'

const DaoList = () => {
  const [sortKey, setSortKey] = useState('all-regime')
  const [searchKey, setSearchKey] = useState('')
  const {
    dao: { daoData },
  } = useSelector((state: AppState) => state)
  const {
    ui: { infix },
  } = useUI()
  const sortDaoRegime = useSearchDao(sortKey)
  const filterDaoData = useMemo(() => {
    if (!sortDaoRegime) return
    const data: Record<string, DaoData> = {}
    sortDaoRegime.forEach((daoAddr) => (data[daoAddr] = daoData[daoAddr]))
    return data
  }, [daoData, sortDaoRegime])
  const searchDao = useSearchDao(searchKey, filterDaoData)

  const searchData =
    !searchKey || searchKey.length < 3 ? sortDaoRegime : searchDao

  const spanMobile = infix === 'xs' ? 12 : undefined

  return (
    <Row gutter={[24, 16]}>
      <Col xs={24} md={12}>
        <Row gutter={[24, 24]}>
          <Col span={spanMobile}>
            <SortDao onSort={setSortKey} value={sortKey} />
          </Col>
          <Col span={spanMobile} flex="auto">
            <SearchDao onSearch={setSearchKey} />
          </Col>
        </Row>
      </Col>
      <Col span={24} />
      {(searchData || Object.keys(daoData)).map((daoAddress) => (
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
