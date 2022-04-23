import { useCallback, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Row, Col, Card, Button } from 'antd'
import CreateDaoSteps, {
  CreateSteps,
  CreateStepsHandle,
} from './createDaoSteps'
import CreateDaoTitle, { CreateDaoTitleProps } from './createDaoTitle'
import IonIcon from 'shared/antd/ionicon'

import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

const BackActions = ({
  step,
  onHandleStep = () => {},
}: CreateDaoTitleProps) => {
  const history = useHistory()

  if (step > 0)
    return (
      <Button
        type="text"
        icon={<IonIcon name="arrow-back-outline" />}
        onClick={onHandleStep}
        size="large"
      >
        Back
      </Button>
    )
  return (
    <Button
      type="text"
      icon={<IonIcon name="trash-outline" />}
      onClick={() => history.push(`/app/${appId}/dao`)}
      size="large"
    >
      Cancel
    </Button>
  )
}

const ContinuesAction = ({
  step,
  onHandleStep,
  onConfirm,
  onSetMetaData,
}: CreateDaoTitleProps) => {
  const onClick = () => {
    if (step === CreateSteps.stepOne) return onSetMetaData?.()
    return onHandleStep?.()
  }
  if (step === CreateSteps.stepThree)
    return (
      <Button onClick={onConfirm} type="primary" size="large">
        Confirm
      </Button>
    )
  return (
    <Button onClick={onClick} type="primary" size="large">
      Continues
    </Button>
  )
}

const DaoInitialization = () => {
  const createDaoStepRef = useRef<CreateStepsHandle>(null)
  const [step, setStep] = useState(1)
  const [cid, setCid] = useState('')

  const onNextStep = useCallback(async () => {
    try {
      if (!createDaoStepRef?.current) throw new Error('Something went wrong!')
      const validDao = await createDaoStepRef.current.validDaoData(cid)
      if (step === CreateSteps.stepTwo && !validDao)
        throw new Error('Invalid Dao!')
      return setStep(step + 1)
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    }
  }, [cid, step])

  const onSetMetaData = useCallback(async () => {
    try {
      if (!createDaoStepRef?.current) throw new Error('Something went wrong!')
      const validMetaData = await createDaoStepRef.current.validMetaData()
      if (!validMetaData) throw new Error('Invalid metadata')
      const cid = await createDaoStepRef.current.uploadMetaData()
      if (!cid) throw new Error('Invalid CID')
      setCid(cid)
      onNextStep()
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    }
  }, [onNextStep])

  const onConfirm = useCallback(async () => {
    try {
      if (!createDaoStepRef?.current) throw new Error('Something went wrong!')
      await createDaoStepRef.current.createDao(cid)
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    }
  }, [cid])

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} lg={16}>
        <Card bordered={false}>
          <Row gutter={[24, 32]}>
            <Col span={24}>
              <CreateDaoTitle step={step} />
            </Col>
            <Col span={24}>
              <CreateDaoSteps step={step} ref={createDaoStepRef} />
            </Col>
            <Col span={24} />
            <Col flex="auto">
              <BackActions step={step} onHandleStep={() => setStep(step - 1)} />
            </Col>
            <Col>
              <ContinuesAction
                step={step}
                onHandleStep={onNextStep}
                onSetMetaData={onSetMetaData}
                onConfirm={onConfirm}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default DaoInitialization
