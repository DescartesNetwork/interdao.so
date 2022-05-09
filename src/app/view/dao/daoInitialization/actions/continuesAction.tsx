import { Button } from 'antd'
import { CreateDaoTitleProps } from '../createDaoProgress'
import { CreateSteps } from '../createDaoSteps'

const ContinuesAction = ({
  step,
  onHandleStep,
  onConfirm,
  disabled = false,
  loading = false,
}: CreateDaoTitleProps) => {
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
