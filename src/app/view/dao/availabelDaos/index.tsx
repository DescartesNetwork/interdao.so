import LazyLoad from '@sentre/react-lazyload'

import { Empty, Col, Row, Spin } from 'antd'
import DaoCard from '../publicDaos/daoCard'

import useAvailableDaos from 'app/hooks/daos/useAvailableDaos'

const AvailableDaos = () => {
  const availableDaos = useAvailableDaos()

  if (availableDaos?.length === 0)
    return <Empty description="No available DAOs" />

  return (
    <Spin spinning={availableDaos === undefined} tip="Loading...">
      <Row gutter={[24, 24]}>
        {availableDaos?.map((daoAddress) => (
          <Col xs={24} md={12} xl={8} key={daoAddress}>
            <LazyLoad height={191.5}>
              <DaoCard daoAddress={daoAddress} />
            </LazyLoad>
          </Col>
        ))}
      </Row>
    </Spin>
  )
}

export default AvailableDaos
