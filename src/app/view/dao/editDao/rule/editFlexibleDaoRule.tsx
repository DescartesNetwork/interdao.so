import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { SystemProgram } from '@solana/web3.js'
import BN from 'bn.js'
import { DaoRegime } from '@interdao/core'
import isEqual from 'react-fast-compare'

import { Col, Row } from 'antd'
import DaoRule from '../../daoInitialization/flexibleDAO/daoRule'
import ActionButton from '../actionButton'

import configs from 'app/configs'
import { AppState } from 'app/model'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { explorer } from 'shared/util'

const {
  sol: { interDao },
} = configs

const EditFlexibleDaoRule = ({ daoAddress }: { daoAddress: string }) => {
  const [loading, setLoading] = useState(false)
  const [oldRegime, setOldRegime] = useState<DaoRegime>()
  const [oldSupply, setOldSupply] = useState<BN>(new BN(0))
  const {
    daos: { daos, initDao },
  } = useSelector((state: AppState) => state)
  const { mint, regime, supply } = daos?.[daoAddress] || {
    regime: {},
    supply: new BN(0),
    mint: SystemProgram.programId,
  }
  const decimals = useMintDecimals(mint.toBase58()) || 0

  const updateRegime = async () => {
    const { regime } = initDao
    if (!regime || isEqual(regime, oldRegime)) return
    try {
      const { txId } = await interDao.updateDaoRegime(regime, daoAddress)
      return window.notify({
        type: 'success',
        description: 'Update regime successfully. Click here to view details',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    }
  }

  const updateSupply = async () => {
    const { supply } = initDao
    const supplyDecimal = supply.mul(new BN(10).pow(new BN(decimals)))
    if (!supply || isEqual(supplyDecimal, oldSupply)) return
    try {
      const { txId: txIdSupply } = await interDao.updateDaoSupply(
        supplyDecimal,
        daoAddress,
      )
      return window.notify({
        type: 'success',
        description: 'Update supply successfully. Click here to view details',
        onClick: () => window.open(explorer(txIdSupply), '_blank'),
      })
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    }
  }

  const onUpdate = async () => {
    setLoading(true)
    await updateRegime()
    await updateSupply()
    return setLoading(false)
  }

  const setDefaultValue = useCallback(() => {
    if (oldSupply && oldRegime) return
    setOldSupply(supply)
    setOldRegime(regime)
  }, [oldRegime, oldSupply, regime, supply])

  useEffect(() => {
    setDefaultValue()
  }, [setDefaultValue])

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <DaoRule />
      </Col>
      <Col span={24}>
        <ActionButton
          loading={loading}
          onSave={onUpdate}
          daoAddress={daoAddress}
        />
      </Col>
    </Row>
  )
}

export default EditFlexibleDaoRule
