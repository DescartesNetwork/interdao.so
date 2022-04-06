import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import BN from 'bn.js'

import {
  Button,
  Col,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Typography,
} from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'

import configs from 'app/configs'
import { DaoMechanisms } from '@interdao/core'
import { account } from '@senswap/sen-js'
import { explorer } from 'shared/util'
import useMintDecimals from 'shared/hooks/useMintDecimals'

export type DaoInitializationFormProps = {
  visible: boolean
  onClose: () => void
}

const DaoInitializationForm = ({
  visible = true,
  onClose = () => {},
}: DaoInitializationFormProps) => {
  const [mechanism, setMechanism] = useState('Dictatorial')
  const [mintAddress, setMintAddress] = useState('')
  const [circulatingSupply, setCirculatingSupply] = useState('')
  const [loading, setLoading] = useState(false)
  const decimals = useMintDecimals(mintAddress) || 0

  const valid = useMemo(() => {
    if (!account.isAddress(mintAddress)) return false
    if (!circulatingSupply || !Number(circulatingSupply)) return false
    if (!decimals) return false
    return true
  }, [mintAddress, circulatingSupply, decimals])

  const close = useCallback(() => {
    setMechanism('Dictatorial')
    setMintAddress('')
    setCirculatingSupply('')
    return onClose()
  }, [onClose])

  const newDao = useCallback(async () => {
    if (!valid) return
    const {
      sol: { interDao },
    } = configs
    try {
      setLoading(true)
      const supply = new BN(circulatingSupply).mul(
        new BN(10).pow(new BN(decimals)),
      )
      const { txId } = await interDao.initializeDao(
        mintAddress,
        supply,
        undefined,
        DaoMechanisms[mechanism],
      )
      window.notify({
        type: 'success',
        description: 'A new DAO is created. Click here to view details.',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
      return close()
    } catch (er: any) {
      return window.notify({
        type: 'error',
        description: er.message,
      })
    } finally {
      return setLoading(false)
    }
  }, [valid, mechanism, mintAddress, circulatingSupply, decimals, close])

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      closeIcon={<IonIcon name="close-outline" />}
    >
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Typography.Title level={5}>New DAO</Typography.Title>
        </Col>
        <Col span={24}>
          <Space direction="vertical">
            <Typography.Text type="secondary">DAO Mechanism</Typography.Text>
            <Radio.Group
              onChange={(e: RadioChangeEvent) =>
                setMechanism(e.target.value || 'Dictatorial')
              }
              value={mechanism}
            >
              <Radio value="Dictatorial">Dictatorial</Radio>
              <Radio value="Democratic">Democratic</Radio>
              <Radio value="Autonomous">Autonomous</Radio>
            </Radio.Group>
          </Space>
        </Col>
        <Col span={24}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Text type="secondary">Token</Typography.Text>
            <Input
              placeholder="Token Address"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMintAddress(e.target.value || '')
              }
              value={mintAddress}
              suffix={
                <Space>
                  <Typography.Text type="secondary">
                    <MintSymbol mintAddress={mintAddress} />
                  </Typography.Text>
                  <MintAvatar mintAddress={mintAddress} />
                </Space>
              }
            />
            <Input
              placeholder="Circulating Supply"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCirculatingSupply(e.target.value || '')
              }
              value={circulatingSupply}
            />
          </Space>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            onClick={newDao}
            disabled={!valid}
            loading={loading}
            block
          >
            OK
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default DaoInitializationForm