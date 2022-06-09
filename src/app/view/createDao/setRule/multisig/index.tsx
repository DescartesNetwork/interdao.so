import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DaoRegimes } from '@interdao/core'
import { account } from '@senswap/sen-js'

import { Button, Col, Row } from 'antd'
import Regime from './regime'
import DAOMembers from './daoMembers'
import Privacy from '../privacy'

import { AppDispatch, AppState } from 'app/model'
import {
  DAOMember,
  revertPrevStep,
  submitStepSetRule,
} from 'app/model/createDao.controller'

const MultiSigDAORule = () => {
  const [members, setMember] = useState<DAOMember[]>([])
  const [isPublic, setIsPublic] = useState(false)
  const metadata = useSelector(
    (state: AppState) => state.createDao.data.metadata,
  )
  const dispatch = useDispatch<AppDispatch>()

  const disabled = useMemo(() => {
    let valid = false
    for (const member of members) {
      const { name, walletAddress } = member
      if (!name || !account.isAddress(walletAddress)) {
        valid = true
        break
      }
    }
    return valid
  }, [members])

  const onNextStep = () => {
    const nextMetadata = { ...metadata, members }
    return dispatch(
      submitStepSetRule({
        rule: { isPublic, metadata: nextMetadata },
      }),
    )
  }

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Regime regime={DaoRegimes.Autonomous} />
          </Col>
          <Col span={24}>
            <Privacy isPublic={isPublic} setIsPublic={setIsPublic} />
          </Col>
          <Col span={24}>
            <DAOMembers members={members} setMember={setMember} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row>
          <Col flex="auto">
            <Button
              type="text"
              size="large"
              onClick={() => dispatch(revertPrevStep())}
            >
              Back
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              disabled={disabled}
              onClick={onNextStep}
            >
              Continue
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default MultiSigDAORule
