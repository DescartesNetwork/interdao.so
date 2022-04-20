import { useCallback, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { account } from '@senswap/sen-js'
import BN from 'bn.js'
import { DaoRegimes } from '@interdao/core'

import { Button, Card, Col, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import RegimeInput from './regimeInput'
import TokenAddressInput from './tokenAddressInput'
import CirculatingSupplyInput from './circulatingSupplyInput'
import MetaDataForm from './metaDataForm'

import useMintDecimals from 'shared/hooks/useMintDecimals'
import configs from 'app/configs'
import { explorer } from 'shared/util'

const {
  manifest: { appId },
  sol: { interDao },
} = configs

const DaoInitialization = () => {
  const [regime, setRegime] = useState(DaoRegimes.Dictatorial)
  const [mintAddress, setMintAddress] = useState('')
  const [circulatingSupply, setCirculatingSupply] = useState('')
  const [loading, setLoading] = useState(false)
  const [advanceSetting, setAdvanceSetting] = useState(false)
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
    try {
      setLoading(true)
      const supply = new BN(circulatingSupply).mul(
        new BN(10).pow(new BN(decimals)),
      )
      const metadata = Buffer.from([]) // Replace the real hash here
      const { txId, daoAddress } = await interDao.initializeDao(
        mintAddress,
        supply,
        metadata,
        undefined, // Optional DAO's keypair
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
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} md={16}>
        <Card bordered={false}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Row>
                <Col flex="auto">
                  <Typography.Title level={3}>
                    New DAO Information
                  </Typography.Title>
                </Col>
                <Col>
                  <Button
                    type="text"
                    onClick={() => setAdvanceSetting(!advanceSetting)}
                    icon={<IonIcon name="cog-outline" />}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24} />
            {advanceSetting && (
              <Col span={24}>
                <MetaDataForm />
              </Col>
            )}
            <Col span={24}>
              <RegimeInput value={regime} onChange={setRegime} />
            </Col>
            <Col span={24}>
              <TokenAddressInput
                value={mintAddress}
                onChange={setMintAddress}
              />
            </Col>
            <Col span={24}>
              <CirculatingSupplyInput
                mintAddress={mintAddress}
                value={circulatingSupply}
                onChange={setCirculatingSupply}
              />
            </Col>
            <Col span={24} />
            <Col flex="auto">
              <Button
                type="text"
                icon={<IonIcon name="trash-outline" />}
                onClick={() => history.push(`/app/${appId}/dao`)}
                size="large"
              >
                Cancel
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
      </Col>
    </Row>
  )
}

export default DaoInitialization
