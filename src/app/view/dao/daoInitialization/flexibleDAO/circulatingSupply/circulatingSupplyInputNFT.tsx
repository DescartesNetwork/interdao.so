import { account } from '@senswap/sen-js'

import { Button, Col, Row, Space, Spin, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import NumericInput from 'shared/antd/numericInput'
import { LoadingOutlined } from '@ant-design/icons'

import { numeric } from 'shared/util'
import { getListAccountNFTsBelongToCollection } from 'app/helpers/metaplex'
import { useCallback, useEffect, useState } from 'react'

export type CirculatingSupplyInputProps = {
  mintAddress?: string
  value: string
  onChange: (value: string) => void
}

const CirculatingSupplyInputNFT = ({
  mintAddress = '',
  value,
  onChange,
}: CirculatingSupplyInputProps) => {
  const [suggestion, setSuggestion] = useState('')
  const [loading, setLoading] = useState(false)

  const getNftSuggestion = useCallback(async () => {
    if (!account.isAddress(mintAddress)) return setSuggestion('')
    setLoading(true)
    try {
      let accounts = await getListAccountNFTsBelongToCollection(mintAddress)
      setSuggestion(accounts.length.toString())
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }, [mintAddress])

  useEffect(() => {
    getNftSuggestion()
  }, [getNftSuggestion])

  return (
    <Row gutter={[8, 8]} justify="end">
      <Col span={24}>
        <Typography.Text>Total DAO Power</Typography.Text>
      </Col>
      <Col span={24}>
        <NumericInput
          value={value}
          onValue={onChange}
          className="border-less"
          size="large"
          placeholder="Input Total DAO Power"
          suffix={
            <Button
              type="text"
              onClick={() => onChange(suggestion)}
              icon={<IonIcon name="copy-outline" />}
              style={{ marginRight: -7 }}
            >
              By Suggestion
            </Button>
          }
        />
      </Col>
      <Col>
        <Space>
          <Typography.Text type="secondary">
            Suggestion NFT collection supply:
          </Typography.Text>
          {loading ? (
            <Spin
              spinning={loading}
              indicator={<LoadingOutlined style={{ fontSize: 24 }} />}
            />
          ) : (
            <Typography.Text>
              {numeric(suggestion).format('0,0')}
            </Typography.Text>
          )}
        </Space>
      </Col>
    </Row>
  )
}

export default CirculatingSupplyInputNFT
