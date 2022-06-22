import { useMemo } from 'react'
import LazyLoad from '@sentre/react-lazyload'

import { Empty, Col, Row } from 'antd'
import DaoCard from '../publicDaos/daoCard'

import useAvailableDaos from 'app/hooks/daos/useAvailableDaos'

const AvailableDaos = () => {
  const availableDaos = useAvailableDaos()
  const daos = useMemo(() => Object.keys(availableDaos), [availableDaos])

  if (!daos.length) return <Empty />

  return (
    <Row gutter={[24, 24]}>
      {daos.map((daoAddress) => (
        <Col xs={24} md={12} xl={8} key={daoAddress}>
          <LazyLoad height={191.5}>
            <DaoCard daoAddress={daoAddress} />
          </LazyLoad>
        </Col>
      ))}
    </Row>
  )
}

export default AvailableDaos
