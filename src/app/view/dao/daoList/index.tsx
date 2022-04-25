import { useSelector } from 'react-redux'
import LazyLoad from '@senswap/react-lazyload'

import { Col, Row } from 'antd'
import DaoCard from './daoCard'

import { AppState } from 'app/model'

import './index.less'

const DaoList = () => {
  const {
    dao: { daoData },
  } = useSelector((state: AppState) => state)

  return (
    <Row gutter={[24, 16]}>
      {Object.keys(daoData).map((daoAddress) => (
        <Col key={daoAddress} xs={24} md={12}>
          <LazyLoad height={282.05}>
            <DaoCard daoAddress={daoAddress} special />
          </LazyLoad>
        </Col>
      ))}
    </Row>
  )
}

export default DaoList
