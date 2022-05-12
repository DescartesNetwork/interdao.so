import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import LazyLoad from '@senswap/react-lazyload'
import { DaoData } from '@interdao/core'

import { Col, Empty, Row } from 'antd'
import DaoCard from './daoCard'
import SearchDao from './search'
import SortDao from './sortDao'
import TypeOfDAO from './typeOfDao'

import { AppState } from 'app/model'
import useSearchDao from 'app/hooks/useSearchDao'

import './index.less'

const DaoList = () => {
  const [sortKey, setSortKey] = useState('all-regime')
  const [searchKey, setSearchKey] = useState('')
  const {
    dao: { daoData },
  } = useSelector((state: AppState) => state)

  const { searchData: sortDaoRegime } = useSearchDao(sortKey)
  const filterDaoData = useMemo(() => {
    if (!sortDaoRegime) return
    const data: Record<string, DaoData> = {}
    sortDaoRegime.forEach((daoAddr) => (data[daoAddr] = daoData[daoAddr]))
    return data
  }, [daoData, sortDaoRegime])
  const { searchData: searchDao, loading } = useSearchDao(
    searchKey,
    filterDaoData,
  )

  const searchData =
    !searchKey || searchKey.length < 3 ? sortDaoRegime : searchDao

  return (
    <Row gutter={[24, 16]}>
      <Col xs={24} md={16}>
        <Row gutter={[12, 12]}>
          <Col xs={12} md={6}>
            <TypeOfDAO />
          </Col>
          <Col xs={12} md={6}>
            <SortDao onSort={setSortKey} value={sortKey} />
          </Col>
          <Col xs={24} md={12}>
            <SearchDao onSearch={setSearchKey} loading={loading} />
          </Col>
        </Row>
      </Col>
      <Col span={24} />
      {searchKey.length >= 3 && (!searchDao || !searchDao.length) ? (
        <Col span={24} style={{ textAlign: 'center' }}>
          <Empty />
        </Col>
      ) : (
        (searchData || Object.keys(daoData)).map((daoAddress) => (
          <Col key={daoAddress} xs={24} md={12} xl={8}>
            <LazyLoad height={479.75}>
              <DaoCard daoAddress={daoAddress} special />
            </LazyLoad>
          </Col>
        ))
      )}
    </Row>
  )
}

export default DaoList
