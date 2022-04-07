import { Fragment, useState } from 'react'

import { Button } from 'antd'
import DaoInitializationForm from './form'

const DaoInitialization = () => {
  const [visible, setVisible] = useState(false)

  return (
    <Fragment>
      <Button ghost onClick={() => setVisible(true)}>
        New DAO
      </Button>
      <DaoInitializationForm
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </Fragment>
  )
}

export default DaoInitialization
