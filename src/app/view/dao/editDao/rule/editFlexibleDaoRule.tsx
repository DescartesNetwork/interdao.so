import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BN from 'bn.js'
import { DaoRegime } from '@interdao/core'
import isEqual from 'react-fast-compare'

import { Col, Row } from 'antd'
import ActionButton from '../actionButton'
import RegimeInput from 'app/view/createDao/setRule/flexible/regimeInput'
import CirculatingSupply from 'app/view/createDao/setRule/flexible/circulatingSupply'

import configs from 'app/configs'
import { AppState } from 'app/model'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { explorer } from 'shared/util'

const {
  sol: { interDao },
} = configs

const EditFlexibleDaoRule = ({ daoAddress }: { daoAddress: string }) => {
  const { isNft, mint, regime, supply } = useSelector(
    (state: AppState) => state.daos[daoAddress],
  )
  const decimals = useMintDecimals(mint.toBase58()) || 0
  const [loading, setLoading] = useState(false)
  const [nextRegime, setRegime] = useState<DaoRegime>(regime)
  const [nextSupply, setSupply] = useState('0')

  const updateRegime = async () => {
    if (!nextRegime || isEqual(nextRegime, regime)) return
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
    const supplyDecimal = supply.mul(new BN(10).pow(new BN(decimals)))
    if (!nextSupply || isEqual(supplyDecimal, supply)) return
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

  useEffect(() => {
    const defaultSupply = supply.div(new BN(10 ** decimals))
    if (defaultSupply) setSupply(defaultSupply.toString())
  }, [decimals, supply])

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <RegimeInput value={nextRegime} onChangeRegime={setRegime} />
          </Col>
          <Col span={24}>
            <CirculatingSupply
              isNft={isNft}
              mintAddress={mint.toBase58()}
              supply={nextSupply}
              onChangeSupply={setSupply}
            />
          </Col>
        </Row>
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
