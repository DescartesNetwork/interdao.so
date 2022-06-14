import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DaoRegimes } from '@interdao/core'
import { account } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'

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
  const dispatch = useDispatch<AppDispatch>()
  const metadata = useSelector(
    (state: AppState) => state.createDao.data.metadata,
  )
  const [members, setMember] = useState<DAOMember[]>([])
  const [isPublic, setIsPublic] = useState(false)
  const { address: myAddress } = useWallet().wallet

  const setDefaultValue = useCallback(() => {
    if (members.length) return
    const DEFAULT_MEMBER = [{ name: '', walletAddress: myAddress }]
    return setMember(DEFAULT_MEMBER)
  }, [members.length, myAddress, setMember])
  useEffect(() => {
    setDefaultValue()
  }, [setDefaultValue])

  const onSubmit = () => {
    const nextMetadata = { ...metadata, members }
    return dispatch(
      submitStepSetRule({
        rule: { isPublic, metadata: nextMetadata },
      }),
    )
  }

  const disabled = useMemo(() => {
    for (const member of members) {
      const { name, walletAddress } = member
      if (!name || !account.isAddress(walletAddress)) return true
    }
    return false
  }, [members])

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
              onClick={onSubmit}
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
