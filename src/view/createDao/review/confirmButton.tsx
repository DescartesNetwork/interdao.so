import { Button } from 'antd'
import { useSelector } from 'react-redux'

import useFlexibleDao from 'hooks/dao/useFlexibleDao'
import useMultisigDao from 'hooks/dao/useMultisigDao'
import { AppState } from 'model'

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
  const daoType = useSelector(
    (state: AppState) => state.createDao.data.metadata.daoType,
  )
  if (daoType === 'flexible-dao') return <ButtonFlexDao />

  return <ButtonMultisigDao />
}

export default ConfirmButton
