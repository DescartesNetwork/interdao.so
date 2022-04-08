import { Col, Row } from 'antd'
import { useState } from 'react'

import ProposalInfo from './initializationStep/proposalInfo'
import VoteRule from './initializationStep/voteRule'
import Review from './initializationStep/review'

import { ProposalInitializeStep } from 'app/constants'

import './index.less'

const ProposalInitialization = () => {
  const [step, setStep] = useState(ProposalInitializeStep.proposalInfo)

  return (
    <Row justify="center">
      <Col xs={24} md={10}>
        <ProposalInfo setStep={setStep} step={step} />
      </Col>
      <Col style={{ height: 15 }} span={24} />
      <Col xs={24} md={10}>
        <VoteRule setStep={setStep} step={step} />
      </Col>
      <Col style={{ height: 15 }} span={24} />
      <Col xs={24} md={10}>
        <Review setStep={setStep} step={step} />
      </Col>
    </Row>
  )
}

export default ProposalInitialization
