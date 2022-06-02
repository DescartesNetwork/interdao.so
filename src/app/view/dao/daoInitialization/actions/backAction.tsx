import { useHistory } from 'react-router-dom'

import { Button } from 'antd'
import { InitDAOHeaderProps } from '../initDAOHeader'

import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

const BackAction = ({ step, onHandleStep = () => {} }: InitDAOHeaderProps) => {
  const history = useHistory()

  if (step > 0)
    return (
      <Button onClick={onHandleStep} size="large">
        Back
      </Button>
    )
  return (
    <Button
      type="text"
      onClick={() => history.push(`/app/${appId}/dao`)}
      size="large"
    >
      Cancel
    </Button>
  )
}

export default BackAction
