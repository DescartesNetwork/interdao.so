import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import BN from 'bn.js'
import isEqual from 'react-fast-compare'
import { util as senhubUtil } from '@sentre/senhub'

import { Col, Row } from 'antd'
import CirculatingSupply from 'view/createDao/setRule/flexible/circulatingSupply'
import ActionButton from './actionButton'

import configs from 'configs'
import { AppState } from 'model'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import util from '@senswap/sen-js/dist/utils'

const {
  sol: { interDao },
} = configs

const EditSupply = ({ daoAddress }: { daoAddress: string }) => {
  const [nextSupply, setSupply] = useState('0')
  const [loading, setLoading] = useState(false)
  const { isNft, mint, supply } = useSelector(
    (state: AppState) => state.daos[daoAddress],
  )
  const decimals = useMintDecimals(mint.toBase58()) || 0

  const ok = useMemo(() => {
    if (!nextSupply) return false
    const supplyDecimal = util.decimalize(nextSupply, decimals).toString()
    if (isEqual(new BN(supplyDecimal), supply)) return false
    return true
  }, [decimals, nextSupply, supply])

  const updateSupply = async () => {
    try {
      setLoading(true)
      const supplyDecimal = util.decimalize(nextSupply, decimals).toString()
      const { txId: txIdSupply } = await interDao.updateDaoSupply(
        new BN(supplyDecimal),
        daoAddress,
      )
      return window.notify({
        type: 'success',
        description: 'Update supply successfully. Click here to view details',
        onClick: () => window.open(senhubUtil.explorer(txIdSupply), '_blank'),
      })
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const defaultSupply = supply.div(new BN(10 ** decimals))
    if (defaultSupply) setSupply(defaultSupply.toString())
  }, [decimals, supply])

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <CirculatingSupply
          isNft={isNft}
          mintAddress={mint.toBase58()}
          supply={nextSupply}
          onChangeSupply={setSupply}
        />
      </Col>
      <Col span={24}>
        <ActionButton
          loading={loading}
          onSave={updateSupply}
          daoAddress={daoAddress}
          disabled={!ok}
        />
      </Col>
    </Row>
  )
}

export default EditSupply
