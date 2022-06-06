import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import LazyLoad from '@sentre/react-lazyload'

import { Col, Empty, Row } from 'antd'
import DaoCard from './daoCard'
import SearchDao from './search'
import SortDao from './sortDao'
import TypeOfDAO from './typeOfDao'

import { AppState } from 'app/model'
import useSearchDao from 'app/hooks/useSearchDao'
import useDaoType from 'app/hooks/useDaoType'

import './index.less'

const DaoList = () => {
  const [mechanisms, setMechanisms] = useState('all-regime')
  const [type, setType] = useState('all-type')
  const [searchKey, setSearchKey] = useState('')
  const {
    daos: { daos },
  } = useSelector((state: AppState) => state)
  const listDaoByType = useDaoType(type)

  const filterDaoAddress = useMemo(() => {
    if (!listDaoByType.length) return []
    if (mechanisms === 'all-regime') return listDaoByType

    const filteredAddress = []
    for (const daoAddress of listDaoByType) {
      const { regime } = daos[daoAddress]
      const parseRegime = Object.keys(regime)[0]
      if (mechanisms === parseRegime) filteredAddress.push(daoAddress)
    }
    return filteredAddress
  }, [listDaoByType, daos, mechanisms])

  const { searchData, loading } = useSearchDao(searchKey, filterDaoAddress)

  return (
    <Row gutter={[24, 16]}>
      <Col xs={24} md={16}>
        <Row gutter={[12, 12]}>
          <Col xs={12} md={6}>
            <TypeOfDAO value={type} setType={setType} />
          </Col>
          <Col xs={12} md={6}>
            <SortDao onSort={setMechanisms} value={mechanisms} />
          </Col>
          <Col xs={24} md={12}>
            <SearchDao onSearch={setSearchKey} loading={loading} />
          </Col>
        </Row>
      </Col>
      <Col span={24} />
      {searchKey.length >= 3 && (!searchData || !searchData.length) ? (
        <Col span={24} style={{ textAlign: 'center' }}>
          <Empty />
        </Col>
      ) : (
        (searchData || filterDaoAddress).map((daoAddress) => (
          <Col key={daoAddress} xs={24} md={12} xl={8}>
            <LazyLoad height={479.75} offset={2}>
              <DaoCard daoAddress={daoAddress} />
            </LazyLoad>
          </Col>
        ))
      )}
    </Row>
  )
}

export default DaoList
