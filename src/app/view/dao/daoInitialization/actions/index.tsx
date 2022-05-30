import { Button, Col, Row } from 'antd'
import { CreateSteps } from '../initDAOContainer'
import { InitDAOHeaderProps } from '../initDAOHeader'
import BackAction from './backAction'
import ConfirmButton from './confirmButton'

type ActionButtonProps = {
  setStep: () => void
} & InitDAOHeaderProps

const ActionButton = ({
  step,
  onHandleStep,
  disabled,
  setStep,
}: ActionButtonProps) => {
  return (
    <Row>
      <Col flex="auto">
        <BackAction step={step} onHandleStep={setStep} />
      </Col>
      <Col>
        {step === CreateSteps.stepThree ? (
          <ConfirmButton />
        ) : (
          <Button
            onClick={onHandleStep}
            type="primary"
            size="large"
            disabled={disabled}
          >
            Continue
          </Button>
        )}
      </Col>
    </Row>
  )
}

export default ActionButton
