import { Button } from 'antd'
import { CreateDaoTitleProps } from '../createDaoProgress'
import { CreateSteps } from '../createDaoSteps'

const ContinuesAction = ({
  step,
  onHandleStep,
  onConfirm,
}: CreateDaoTitleProps) => {
  if (step === CreateSteps.stepThree)
    return (
      <Button onClick={onConfirm} type="primary" size="large">
        Confirm
      </Button>
    )
  return (
    <Button onClick={onHandleStep} type="primary" size="large">
      Continues
    </Button>
  )
}

export default ContinuesAction
