import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { util } from '@sentre/senhub'

import { Col, Row, Space, Tooltip, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import ModalNftCollection from 'view/createDao/components/modalNftCollection'

const Address = ({ address }: { address: string }) => {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    setCopied(true)
    await util.asyncWait(1500)
    setCopied(false)
  }

  return (
    <Space>
      <Typography.Text className="t-16">
        NFT collection address: {util.shortenAddress(address)}
      </Typography.Text>
      <Tooltip title="Copied" visible={copied}>
        <CopyToClipboard text={address} onCopy={onCopy}>
          <Typography.Text style={{ cursor: 'pointer' }} className="t-16">
            <IonIcon name="copy-outline" />
          </Typography.Text>
        </CopyToClipboard>
      </Tooltip>
    </Space>
  )
}

type VoteNftInputProps = {
  mintAddress: string
  onMintAddressChange: (mintAddress: string) => void
}

const VoteNftInput = ({
  mintAddress,
  onMintAddressChange,
}: VoteNftInputProps) => {
  return (
    <Row gutter={[24, 24]}>
      <Col>
        <ModalNftCollection
          mintAddress={mintAddress}
          onSelect={onMintAddressChange}
        />
      </Col>
      <Col flex={1}>
        <Row align="bottom" style={{ height: '100%' }}>
          <Col span={24}>
            {mintAddress && <Address address={mintAddress} />}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default VoteNftInput
