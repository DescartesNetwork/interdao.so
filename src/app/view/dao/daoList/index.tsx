import { Col, Row } from 'antd'
import { AppState } from 'app/model'
import { useSelector } from 'react-redux'
import DaoCard from './daoCard'

const DaoList = () => {
  const { dao } = useSelector((state: AppState) => state)

  return (
    <Row gutter={[24, 24]}>
      {Object.keys(dao).map((daoAddress, i) => (
        <Col key={i} xs={24} md={12} lg={8} xl={6}>
          <DaoCard daoAddress={daoAddress} />
        </Col>
      ))}
    </Row>
  )
}

export default DaoList
