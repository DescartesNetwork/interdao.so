import { useMemo, useState } from 'react'
import LazyLoad from '@sentre/react-lazyload'

import { Col, Empty, Row } from 'antd'
import DaoCard from './daoCard'
import SearchDao from './search'
import Mechanisms from './mechanisms'
import TypeOfDAO from './typeOfDao'

import useSearchDao from 'app/hooks/useSearchDao'
import usePublicDaos from 'app/hooks/daos/usePublicDaos'

import './index.less'

const PublicDaos = () => {
  const [mechanisms, setMechanisms] = useState('all')
  const [searchKey, setSearchKey] = useState('')
  const [type, setType] = useState('all')
  const publicDaos = usePublicDaos(type, mechanisms)

  const daos = useMemo(() => Object.keys(publicDaos), [publicDaos])
  const { searchData, loading } = useSearchDao(searchKey, daos)

  return (
    <Row gutter={[24, 16]}>
      <Col xs={24} md={16}>
        <Row gutter={[12, 12]}>
          <Col xs={12} md={6}>
            <TypeOfDAO value={type} setType={setType} />
          </Col>
          <Col xs={12} md={6}>
            <Mechanisms onSort={setMechanisms} value={mechanisms} />
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
        (searchData || Object.keys(publicDaos)).map((daoAddress) => (
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

export default PublicDaos
