import { useState } from 'react'
import { useSelector } from 'react-redux'
import { DaoRegime } from '@interdao/core'
import isEqual from 'react-fast-compare'

import { Col, Row } from 'antd'
import ActionButton from '../actionButton'
import RegimeInput from 'view/createDao/setRule/flexible/regimeInput'

import { AppState } from 'model'
import { notifyError, notifySuccess } from 'helpers'

const EditFlexibleDaoRule = ({ daoAddress }: { daoAddress: string }) => {
  const { regime } = useSelector((state: AppState) => state.daos[daoAddress])
  const [nextRegime, setRegime] = useState<DaoRegime>(regime)
  const [loading, setLoading] = useState(false)

  const updateRegime = async () => {
    if (!nextRegime || isEqual(nextRegime, regime)) return
    try {
      setLoading(true)
      const { txId } = await window.interDao.updateDaoRegime(
        nextRegime,
        daoAddress,
      )
      return notifySuccess('Update regime', txId)
    } catch (er: any) {
      return notifyError(er)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <RegimeInput value={nextRegime} onChangeRegime={setRegime} />
      </Col>
      <Col span={24}>
        <ActionButton
          loading={loading}
          onSave={updateRegime}
          daoAddress={daoAddress}
          disabled={!nextRegime || isEqual(nextRegime, regime)}
        />
      </Col>
    </Row>
  )
}

export default EditFlexibleDaoRule
