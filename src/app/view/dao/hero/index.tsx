import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Row } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import Banner from './banner'
import InfoCard from './infoCard'

import { numeric } from 'shared/util'
import { AppDispatch, AppState } from 'app/model'
import { getProposals } from 'app/model/proposal.controller'

import './index.less'

const Hero = () => {
  const {
    dao: { daoData },
    proposal,
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch<AppDispatch>()

  const totalDao = useMemo(() => {
    if (!daoData) return 0
    return Object.keys(daoData).length
  }, [daoData])

  const totalProposal = useMemo(() => {
    if (!daoData) return 0
    return Object.keys(proposal).length
  }, [daoData, proposal])

  useEffect(() => {
    const daoAddresses = Object.keys(daoData)
    for (const daoAddress of daoAddresses) {
      dispatch(getProposals({ daoAddress }))
    }
  }, [daoData, dispatch])

  return (
    <Row className="interdao-banner" justify="center">
      <Col xs={24} lg={18}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Banner />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <InfoCard
              icon={<IonIcon name="cash-outline" />}
              title="Total Value Locked"
              value={`$${numeric(900989.09).format('0,0.00')}`}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <InfoCard
              icon={<IonIcon name="earth-outline" />}
              title="Total DAOs"
              value={numeric(totalDao).format('0,0')}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <InfoCard
              icon={<IonIcon name="pencil-outline" />}
              title="Total Proposals"
              value={numeric(totalProposal).format('0,0')}
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <InfoCard
              icon={<IonIcon name="people-outline" />}
              title="Total Members"
              value={numeric(8401).format('0,0')}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Hero
