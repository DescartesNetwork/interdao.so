import { Button } from 'antd'
import { InitDAOHeaderProps } from '../initDAOHeader'
import { CreateSteps } from '../initDAOContainer'

const ContinuesAction = ({
  step,
  onHandleStep,
  onConfirm,
  disabled = false,
  loading = false,
}: InitDAOHeaderProps) => {
  if (step === CreateSteps.stepThree)
    return (
      <Button onClick={onConfirm} type="primary" size="large" loading={loading}>
        Confirm
      </Button>
    )
  return (
    <Button
      onClick={onHandleStep}
      type="primary"
      size="large"
      disabled={disabled}
    >
      Continues
    </Button>
  )
}

export default ContinuesAction
