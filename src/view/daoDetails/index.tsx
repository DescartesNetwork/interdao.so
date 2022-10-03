import { Col, Row } from 'antd'
import DaoInfo from './daoInfo'
import DaoOwnerAssets from './daoOwnerAssets'

import './index.less'

export type DaoDetailsProps = { daoAddress: string }

const DaoDetails = ({ daoAddress }: DaoDetailsProps) => {
  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={16}>
        <DaoInfo daoAddress={daoAddress} />
      </Col>
      <Col xs={24} md={8}>
        <DaoOwnerAssets daoAddress={daoAddress} />
      </Col>
    </Row>
  )
}

export default DaoDetails
