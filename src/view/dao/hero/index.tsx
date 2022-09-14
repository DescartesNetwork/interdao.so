import { useMemo } from 'react'
import { util } from '@sentre/senhub'
import { useSelector } from 'react-redux'

import { Col, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import Banner from './banner'
import InfoCard from './infoCard'

import { AppState } from 'model'

import './index.less'

const Hero = () => {
  const daos = useSelector((state: AppState) => state.daos)
  const proposal = useSelector((state: AppState) => state.proposal)

  const executeProposal = useMemo(() => {
    let total = 0
    for (const proposalAddr in proposal) {
      const { executed } = proposal[proposalAddr]
      if (executed) total++
      continue
    }
    return total
  }, [proposal])

  return (
    <Row className="inter_dao-banner" justify="center">
      <Col xs={24} lg={18}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Banner />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <InfoCard
              icon={<IonIcon name="earth-outline" />}
              title="Total DAOs"
              value={util.numeric(Object.keys(daos).length).format('0,0')}
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <InfoCard
              icon={<IonIcon name="pencil-outline" />}
              title="Total Proposals"
              value={util.numeric(Object.keys(proposal).length).format('0,0')}
            />
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <InfoCard
              icon={<IonIcon name="thumbs-up-outline" />}
              title="Total Executed Proposals"
              value={util.numeric(executeProposal).format('0,0')}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Hero
