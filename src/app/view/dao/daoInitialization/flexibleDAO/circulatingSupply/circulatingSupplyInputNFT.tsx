import { Button, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import NumericInput from 'shared/antd/numericInput'

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

  const getNftSuggestion = useCallback(async () => {
    let accounts = await getListAccountNFTsBelongToCollection(mintAddress)
    setSuggestion(accounts.length.toString())
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
          <Typography.Text>{numeric(suggestion).format('0,0')}</Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default CirculatingSupplyInputNFT
