import { Col, Row, Input } from 'antd'
import { MintSelection } from 'shared/antd/mint'

type VoteTokenInputProps = {
  mintAddress: string
  onMintAddressChange: (mintAddress: string) => void
  disabled: boolean
}

const VoteTokenInput = ({
  mintAddress,
  onMintAddressChange,
  disabled,
}: VoteTokenInputProps) => {
  return (
    <Col flex={1}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Input
            size="large"
            placeholder={'Input Token Address'}
            value={mintAddress}
            className="border-less"
            onChange={(e) => onMintAddressChange(e.target.value)}
            suffix={
              <MintSelection
                value={mintAddress}
                onChange={onMintAddressChange}
                style={{ marginRight: -7 }}
                disabled={disabled}
              />
            }
            autoFocus={true}
            disabled={disabled}
          />
        </Col>
      </Row>
    </Col>
  )
}

export default VoteTokenInput
