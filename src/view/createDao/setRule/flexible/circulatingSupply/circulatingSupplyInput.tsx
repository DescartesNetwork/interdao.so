import BN from 'bn.js'
import { util } from '@sentre/senhub'

import { Button, Col, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import NumericInput from 'shared/antd/numericInput'

import useMintDecimals from 'shared/hooks/useMintDecimals'
import useMintSupply from 'shared/hooks/useMintSupply'

export type CirculatingSupplyInputProps = {
  mintAddress?: string
  value: string
  onChange: (value: string) => void
}

const CirculatingSupplyInput = ({
  mintAddress = '',
  value,
  onChange,
}: CirculatingSupplyInputProps) => {
  const decimals = useMintDecimals(mintAddress) || 0
  const supply = useMintSupply(mintAddress)
  const suggestion = String(supply?.div(new BN(10 ** decimals)) || new BN(0))

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
            Suggestion Token Supply:
          </Typography.Text>
          <Typography.Text>
            {util.numeric(suggestion).format('0,0')}
          </Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default CirculatingSupplyInput
