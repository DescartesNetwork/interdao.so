import { useHistory } from 'react-router-dom'

import { Button } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { CreateDaoTitleProps } from '../createDaoProgress'

import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

const BackAction = ({ step, onHandleStep = () => {} }: CreateDaoTitleProps) => {
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

export default BackAction
