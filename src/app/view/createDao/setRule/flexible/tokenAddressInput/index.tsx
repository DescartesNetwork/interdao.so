import isEqual from 'react-fast-compare'

import { Button, Col, Row, Space, Typography } from 'antd'
import VoteInput from './voteInput'

import './index.less'

type TokenAddressInputProps = {
  isNft: boolean
  onNftChange: (isNft: boolean) => void
  mintAddress: string
  onMintAddressChange: (mintAddress: string) => void
}

const TokenAddressInput = ({
  isNft,
  onNftChange,
  mintAddress,
  onMintAddressChange,
}: TokenAddressInputProps) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space size={32}>
          <Typography.Text>Vote by</Typography.Text>
          <Space size={12}>
            <Button
              onClick={() => onNftChange(false)}
              className={isEqual(isNft, false) ? '' : 'btn-unselect'}
              size="small"
            >
              Token
            </Button>
            <Button
              onClick={() => onNftChange(true)}
              className={isEqual(isNft, true) ? '' : 'btn-unselect'}
              size="small"
            >
              NFT
            </Button>
          </Space>
        </Space>
      </Col>
      <Col span={24}>
        <VoteInput
          isNft={isNft}
          mintAddress={mintAddress}
          onMintAddressChange={onMintAddressChange}
        />
      </Col>
    </Row>
  )
}

export default TokenAddressInput
