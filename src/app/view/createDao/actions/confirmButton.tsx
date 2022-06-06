import { Button } from 'antd'
import { useSelector } from 'react-redux'

import useFlexibleDao from 'app/hooks/dao/useFlexibleDao'
import useMultisigDao from 'app/hooks/dao/useMultisigDao'
import { AppState } from 'app/model'

const ButtonFlexDao = () => {
  const { createFlexDAO, loading } = useFlexibleDao()

  return (
    <Button
      onClick={createFlexDAO}
      type="primary"
      size="large"
      loading={loading}
    >
      Confirm
    </Button>
  )
}

const ButtonMultisigDao = () => {
  const { createMultisigDao, loading } = useMultisigDao()

  return (
    <Button
      onClick={createMultisigDao}
      type="primary"
      size="large"
      loading={loading}
    >
      Confirm
    </Button>
  )
}

const ConfirmButton = () => {
  const initMetadata = useSelector(
    (state: AppState) => state.metadata.initMetadata,
  )
  const { daoType } = initMetadata
  if (daoType === 'flexible-dao') return <ButtonFlexDao />

  return <ButtonMultisigDao />
}

export default ConfirmButton
