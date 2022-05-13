import { Col, Row } from 'antd'
import React from 'react'
import { CreateDaoTitleProps } from '../initDAOHeader'
import BackAction from './backAction'
import ContinuesAction from './continuesAction'

type ActionButtonProps = {
  setStep: () => void
} & CreateDaoTitleProps

const ActionButton = ({
  step,
  onHandleStep,
  onConfirm,
  loading,
  disabled,
  setStep,
}: ActionButtonProps) => {
  return (
    <Row>
      <Col flex="auto">
        <BackAction step={step} onHandleStep={setStep} />
      </Col>
      <Col>
        <ContinuesAction
          step={step}
          onHandleStep={onHandleStep}
          onConfirm={onConfirm}
          loading={loading}
          disabled={disabled}
        />
      </Col>
    </Row>
  )
}

export default ActionButton
