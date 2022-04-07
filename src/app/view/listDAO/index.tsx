import { Col, Image, Row } from 'antd'
import VerifiedDAOs from './verifiedDAOs'
import NormalDAOs from './normalDAOs'
import NotVerifiedDAOs from './notVerifiedDAOs'
import YourDAOs from './yourDAOs'

import banner from 'app/static/images/system/banner.png'

const ListDAO = () => {
  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={24}>
        <Image style={{ marginTop: -24 }} src={banner} preview={false} />
      </Col>
      <Col xs={24} lg={18}>
        <YourDAOs />
      </Col>
      {/* Safe space */}
      <Col span={24} style={{ height: 17 }} />
      <Col xs={24} lg={18}>
        <VerifiedDAOs />
      </Col>
      {/* Safe space */}
      <Col span={24} />
      <Col xs={24} lg={18}>
        <NormalDAOs />
      </Col>
      {/* Safe space */}
      <Col span={24} />
      <Col xs={24} lg={18}>
        <NotVerifiedDAOs />
      </Col>
    </Row>
  )
}

export default ListDAO
