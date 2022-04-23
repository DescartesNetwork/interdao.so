import { Col, Input, Row, Typography } from 'antd'
import { MintSelection } from 'shared/antd/mint'

export type TokenAddressInputProps = {
  value: string
  onChange: (value: string) => void
}

const TokenAddressInput = ({ value, onChange }: TokenAddressInputProps) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text>Token to Vote</Typography.Text>
      </Col>
      <Col span={24}>
        <Input
          size="large"
          placeholder="Input Token Address"
          value={value}
          onChange={(e) => onChange(e.target.value || '')}
          suffix={
            <MintSelection
              value={value}
              onChange={onChange}
              style={{ marginRight: -7 }}
            />
          }
        />
      </Col>
    </Row>
  )
}

export default TokenAddressInput
