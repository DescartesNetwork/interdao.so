import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ConsensusQuorum } from '@interdao/core'

import { Col, Row } from 'antd'
import ConsensusQuorumInput from 'app/components/consensusQuorumInput'
import Regime from './regime'
import PrivacyDAO, { DAOPrivacy } from '../../components/privacyDAO'
import DAOMembers from './daoMembers'

import { AppDispatch, AppState } from 'app/model'
import { setCreateDaoMetaData } from 'app/model/metadata.controller'

const MultiSigDAORule = () => {
  const [privacy, setPrivacy] = useState(DAOPrivacy.Member)
  const {
    metadata: { createMetaData },
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch<AppDispatch>()

  const onChange = (quorum: ConsensusQuorum) => {
    return dispatch(setCreateDaoMetaData({ ...createMetaData, quorum }))
  }

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <Regime />
      </Col>
      <Col span={24}>
        <Row gutter={[12, 12]}>
          <Col xs={24} md={12}>
            <ConsensusQuorumInput
              value={createMetaData.quorum}
              onChange={onChange}
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
