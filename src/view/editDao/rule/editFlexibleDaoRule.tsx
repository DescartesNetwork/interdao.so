import { useState } from 'react'
import { useSelector } from 'react-redux'
import { DaoRegime } from '@interdao/core'
import isEqual from 'react-fast-compare'
import { util } from '@sentre/senhub'

import { Col, Row } from 'antd'
import ActionButton from '../actionButton'
import RegimeInput from 'view/createDao/setRule/flexible/regimeInput'

import { AppState } from 'model'

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
      return window.notify({
        type: 'success',
        description: 'Update regime successfully. Click here to view details',
        onClick: () => window.open(util.explorer(txId), '_blank'),
      })
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
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
