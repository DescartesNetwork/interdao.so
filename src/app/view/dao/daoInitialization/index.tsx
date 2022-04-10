import { useCallback, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { account } from '@senswap/sen-js'
import BN from 'bn.js'
import { DaoRegimes } from '@interdao/core'

import { Button, Card, Col, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import DaoRegimeInput from './daoRegimeInput'
import DaoTokenInput from './daoTokenInput'
import DaoCirculatingSupply from './daoCirculatingSupply'

import useMintDecimals from 'shared/hooks/useMintDecimals'
import configs from 'app/configs'
import { explorer } from 'shared/util'

const DaoInitialization = () => {
  const [regime, setRegime] = useState(DaoRegimes.Dictatorial)
  const [mintAddress, setMintAddress] = useState('')
  const [circulatingSupply, setCirculatingSupply] = useState('')
  const [loading, setLoading] = useState(false)
  const decimals = useMintDecimals(mintAddress) || 0
  const history = useHistory()

  const valid = useMemo(() => {
    if (!account.isAddress(mintAddress)) return false
    if (!circulatingSupply || !Number(circulatingSupply)) return false
    if (!decimals) return false
    return true
  }, [mintAddress, circulatingSupply, decimals])

  const newDao = useCallback(async () => {
    if (!valid) return
    const {
      manifest: { appId },
      sol: { interDao },
    } = configs
    try {
      setLoading(true)
      const supply = new BN(circulatingSupply).mul(
        new BN(10).pow(new BN(decimals)),
      )
      const { txId, daoAddress } = await interDao.initializeDao(
        mintAddress,
        supply,
        undefined,
        regime,
      )
      window.notify({
        type: 'success',
        description: 'A new DAO is created. Click here to view details.',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
      return history.push(`/app/${appId}/dao/${daoAddress}`)
    } catch (er: any) {
      return window.notify({
        type: 'error',
        description: er.message,
      })
    } finally {
      return setLoading(false)
    }
  }, [valid, regime, mintAddress, circulatingSupply, decimals, history])

  return (
    <Card bordered={false}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Typography.Title level={2}>DAO Information</Typography.Title>
        </Col>
        <Col span={24} />
        <Col span={24}>
          <DaoRegimeInput value={regime} onChange={setRegime} />
        </Col>
        <Col span={24}>
          <DaoTokenInput value={mintAddress} onChange={setMintAddress} />
        </Col>
        <Col span={24}>
          <DaoCirculatingSupply
            mintAddress={mintAddress}
            value={circulatingSupply}
            onChange={setCirculatingSupply}
          />
        </Col>
        <Col span={24} />
        <Col flex="auto">
          <Button
            type="text"
            icon={<IonIcon name="arrow-back-outline" />}
            onClick={() => history.push('/app/interdao/dao')}
            size="large"
          >
            Back
          </Button>
        </Col>
        <Col>
          <Button
            onClick={newDao}
            loading={loading}
            type="primary"
            size="large"
            icon={<IonIcon name="add-outline" />}
          >
            Create the DAO
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default DaoInitialization
