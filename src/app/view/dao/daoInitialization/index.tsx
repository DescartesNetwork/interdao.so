import { useHistory } from 'react-router-dom'
import {
  ChangeEvent,
  CSSProperties,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { account } from '@senswap/sen-js'
import BN from 'bn.js'
import { DaoMechanisms } from '@interdao/core'

import {
  Button,
  Card,
  Col,
  Radio,
  Row,
  Space,
  Tag,
  Typography,
  Input,
  RadioChangeEvent,
} from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { MintSymbol } from 'shared/antd/mint'
import NumericInput from 'shared/antd/numericInput'

import useMintDecimals from 'shared/hooks/useMintDecimals'
import configs from 'app/configs'

import './index.less'
import { explorer } from 'shared/util'

const ContentLayout = ({
  label,
  value,
  style = {},
}: {
  label: string
  value: ReactNode
  style?: CSSProperties
}) => (
  <Row style={style} gutter={[8, 8]}>
    <Col span={24}>{label}</Col>
    <Col span={24}>{value}</Col>
  </Row>
)

const DaoInitialization = () => {
  const [mechanism, setMechanism] = useState('Dictatorial')
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

  const close = useCallback(() => {
    setMechanism('Dictatorial')
    setMintAddress('')
    setCirculatingSupply('')
  }, [])

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
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} md={16} lg={14}>
        <Button
          type="text"
          icon={<IonIcon name="arrow-back-outline" />}
          onClick={() => history.push('/app/interdao/dao')}
          style={{ margin: -12 }}
        >
          Back
        </Button>
      </Col>
      <Col xs={24} md={16} lg={14}>
        <Card bordered={false} style={{ borderRadius: 16, boxShadow: 'none' }}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Typography.Title level={2}>DAO Information</Typography.Title>
            </Col>
            <Col span={24}>
              <Space style={{ width: '100%' }} direction="vertical">
                <Typography.Text> Dao Mechanism</Typography.Text>
                <Radio.Group
                  onChange={(e: RadioChangeEvent) =>
                    setMechanism(e.target.value || 'Dictatorial')
                  }
                  value={mechanism}
                  className="mechanism"
                >
                  <Radio className="mechanism-item" value="Dictatorial">
                    Dictatorial
                  </Radio>
                  <Radio className="mechanism-item" value="Democratic">
                    Democratic
                  </Radio>
                  <Radio className="mechanism-item" value="Autonomous">
                    Autonomous
                  </Radio>
                </Radio.Group>
              </Space>
            </Col>
            <Col span={24}>
              <Space style={{ width: '100%' }} direction="vertical">
                <Typography.Title level={4}>Total power</Typography.Title>
                <Row gutter={[24, 24]} className="form-input-token">
                  <Col span={24}>
                    <Space size={16}>
                      <Tag style={{ padding: '5px 16px' }} color="#9B9B9B">
                        Use address token
                      </Tag>
                      <Button type="text" disabled>
                        New Token (Coming soon)
                      </Button>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Row align="middle">
                      <Col flex="auto">
                        <ContentLayout
                          label="Token accepted token for vote"
                          value={
                            <Input
                              placeholder="Token Address"
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setMintAddress(e.target.value || '')
                              }
                              value={mintAddress}
                            />
                          }
                        />
                      </Col>
                      <Col>
                        <ContentLayout
                          style={{ textAlign: 'right' }}
                          label="Token Symbol"
                          value={<MintSymbol mintAddress={mintAddress} />}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Typography.Title level={4}>
                      Token Distribute
                    </Typography.Title>
                  </Col>
                  <Col span={24}>
                    <Row align="middle">
                      <Col flex="auto">
                        <ContentLayout
                          label="Circulating Supply"
                          value={
                            <NumericInput
                              placeholder="Circulating Supply"
                              onValue={setCirculatingSupply}
                              value={circulatingSupply}
                            />
                          }
                        />
                      </Col>
                      <Col>
                        <ContentLayout
                          style={{ textAlign: 'right' }}
                          label="Total token supply"
                          value={
                            <Typography.Text>
                              {circulatingSupply || 0}
                            </Typography.Text>
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Space>
            </Col>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button
                onClick={newDao}
                loading={loading}
                type="primary"
                size="large"
              >
                Create
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default DaoInitialization
