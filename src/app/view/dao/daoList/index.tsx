import { useSelector } from 'react-redux'
import LazyLoad from '@senswap/react-lazyload'

import { Col, Row } from 'antd'
import DaoCard from './daoCard'

import { AppState } from 'app/model'

const DaoList = () => {
  const { dao } = useSelector((state: AppState) => state)

  return (
    <Row gutter={[24, 24]}>
      {Object.keys(dao).map((daoAddress) => (
        <Col key={daoAddress} xs={24} md={12}>
          <LazyLoad height={191.4}>
            <DaoCard daoAddress={daoAddress} />
          </LazyLoad>
        </Col>
      ))}
    </Row>
  )
}

export default DaoList
