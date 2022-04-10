import { Col, Row } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { numeric } from 'shared/util'
import Banner from './banner'
import InfoCard from './infoCard'

const Hero = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Banner />
      </Col>
      <Col xs={24} md={12} lg={6}>
        <InfoCard
          icon={<IonIcon name="cash-outline" />}
          title="Total Value Locked"
          value={`$${numeric(900989.09).format('0,0.00')}`}
        />
      </Col>
      <Col xs={24} md={12} lg={6}>
        <InfoCard
          icon={<IonIcon name="earth-outline" />}
          title="Total DAOs"
          value={numeric(36).format('0,0')}
        />
      </Col>
      <Col xs={24} md={12} lg={6}>
        <InfoCard
          icon={<IonIcon name="pencil-outline" />}
          title="Total Proposals"
          value={numeric(245).format('0,0')}
        />
      </Col>
      <Col xs={24} md={12} lg={6}>
        <InfoCard
          icon={<IonIcon name="people-outline" />}
          title="Total Members"
          value={numeric(8401).format('0,0')}
        />
      </Col>
    </Row>
  )
}

export default Hero
