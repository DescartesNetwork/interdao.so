import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DaoRegimes } from '@interdao/core'
import { account } from '@senswap/sen-js'
import { useWalletAddress } from '@sentre/senhub'

import { Button, Col, Row } from 'antd'
import Regime from './regime'
import DAOMembers from './daoMembers'
import Privacy from '../privacy'

import { AppDispatch, AppState } from 'model'
import {
  DAOMember,
  revertPrevStep,
  submitStepSetRule,
} from 'model/createDao.controller'

const MultiSigDAORule = () => {
  const dispatch = useDispatch<AppDispatch>()
  const metadata = useSelector(
    (state: AppState) => state.createDao.data.metadata,
  )
  const [members, setMember] = useState<DAOMember[]>([])
  const [isPublic, setIsPublic] = useState(false)
  const myAddress = useWalletAddress()

  const setDefaultValue = useCallback(() => {
    if (members.length) return
    if (metadata.members.length) return setMember(metadata.members)
    const DEFAULT_MEMBER = [{ name: '', walletAddress: myAddress }]
    return setMember(DEFAULT_MEMBER)
  }, [members.length, metadata.members, myAddress])

  const onSubmit = () => {
    const nextMetadata = { ...metadata, members }
    return dispatch(
      submitStepSetRule({
        rule: {
          isPublic,
          metadata: nextMetadata,
          regime: DaoRegimes.Autonomous,
        },
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

  useEffect(() => {
    setDefaultValue()
  }, [setDefaultValue])

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
