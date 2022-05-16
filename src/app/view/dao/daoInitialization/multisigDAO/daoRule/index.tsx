import { useState } from 'react'
import { ConsensusQuorums } from '@interdao/core'

import { Col, Row } from 'antd'
import ConsensusQuorumInput from 'app/components/consensusQuorumInput'
import Regime from './regime'
import PrivacyDAO, { DAOPrivacy } from '../../components/privacyDAO'
import DAOMembers from './daoMembers'

const MultiSigDAORule = () => {
  const [consensusQuorum, setConsensusQuorum] = useState(ConsensusQuorums.Half)
  const [privacy, setPrivacy] = useState(DAOPrivacy.Member)
  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <Regime />
      </Col>
      <Col span={24}>
        <Row gutter={[12, 12]}>
          <Col xs={24} md={12}>
            <ConsensusQuorumInput
              value={consensusQuorum}
              onChange={setConsensusQuorum}
            />
          </Col>
          <Col>
            <PrivacyDAO value={privacy} onChange={setPrivacy} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <DAOMembers />
      </Col>
    </Row>
  )
}

export default MultiSigDAORule
