import { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { Row, Col, Card } from 'antd'
import InitDAOContainer, { CreateSteps } from './initDAOContainer'
import InitDAOHeader from './initDAOHeader'
import ActionButton from './actions'

import { AppState } from 'app/model'

import './index.less'

const DaoInitialization = () => {
  const [step, setStep] = useState(0)

  const initMetadata = useSelector(
    (state: AppState) => state.metadata.initMetadata,
  )
  const initDao = useSelector((state: AppState) => state.dao.initDao)
  const { mintAddress, supply, regime } = initDao

  const onNextStep = useCallback(async () => {
    try {
      if (step === CreateSteps.stepOne && !initMetadata)
        throw new Error('Invalid Metadata')
      if (step === CreateSteps.stepTwo && !initDao)
        throw new Error('Invalid DAO data')
      return setStep(step + 1)
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    }
  }, [initDao, initMetadata, step])

  const disabled = useMemo(() => {
    const { daoName, image, daoType, members, description } = initMetadata
    if (step === CreateSteps.stepOne) return !daoName || !image || !description

    if (step === CreateSteps.stepTwo && daoType === 'flexible-dao')
      return !mintAddress || !regime || !Number(supply)

    if (step === CreateSteps.stepTwo && daoType === 'multisig-dao' && members) {
      let valid = false
      for (const member of members) {
        const { name, walletAddress } = member
        if (!name || !account.isAddress(walletAddress)) {
          valid = true
          break
        }
      }
      return valid
    }
  }, [initMetadata, mintAddress, regime, step, supply])

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} lg={16}>
        <Card bordered={false}>
          <Row gutter={[24, 32]}>
            <Col span={24}>
              <InitDAOHeader step={step} />
            </Col>
            <Col span={24}>
              <InitDAOContainer step={step} />
            </Col>
            <Col span={24}>
              <ActionButton
                step={step}
                onHandleStep={onNextStep}
                disabled={disabled}
                setStep={() => setStep(step - 1)}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default DaoInitialization
