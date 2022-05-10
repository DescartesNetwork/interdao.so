import { useState } from 'react'
import { utils } from '@senswap/sen-js'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Col, Row, Space, Tooltip, Typography } from 'antd'
import RowSpaceBetween from 'app/components/rowSpaceBetween'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import IonIcon from 'shared/antd/ionicon'

import useMintDecimals from 'shared/hooks/useMintDecimals'
import { asyncWait, explorer, shortenAddress } from 'shared/util'

export type TransferType = {
  mint?: string
  amount: number
  source: string
  destination: string
}

const TemplateTransfer = ({
  transferInfo,
}: {
  transferInfo?: TransferType
}) => {
  const [copied, setCopied] = useState('address')
  const {
    mint = '',
    source = '',
    destination = '',
    amount = 0,
  } = transferInfo || {}
  const decimals = useMintDecimals(mint) || 0

  const onCopy = async (address: string) => {
    setCopied(address)
    await asyncWait(1500)
    setCopied('address')
  }

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <RowSpaceBetween label="Template" value="SPL/Transfer" />
      </Col>
      <Col span={24}>
        <RowSpaceBetween
          label="Token to be transferred"
          value={
            <Space>
              <MintAvatar mintAddress={mint} />
              <MintSymbol mintAddress={mint} />
            </Space>
          }
        />
      </Col>
      <Col span={24}>
        <RowSpaceBetween
          label="Transfer amount"
          value={utils.undecimalize(BigInt(amount), decimals)}
        />
      </Col>
      <Col span={24}>
        <RowSpaceBetween
          label="Sender's Wallet Address"
          value={
            <Space size={10}>
              <Typography.Text
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => window.open(explorer(source), '_blank')}
              >
                {shortenAddress(source)}
              </Typography.Text>
              <Tooltip title="Copied" visible={copied === source}>
                <CopyToClipboard text={source}>
                  <IonIcon
                    style={{ cursor: 'pointer' }}
                    name="copy-outline"
                    onClick={() => onCopy(source)}
                  />
                </CopyToClipboard>
              </Tooltip>
            </Space>
          }
        />
      </Col>
      <Col span={24}>
        <RowSpaceBetween
          label="Receiver's Wallet Address"
          value={
            <Space size={10}>
              <Typography.Text
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => window.open(explorer(destination), '_blank')}
              >
                {shortenAddress(destination)}
              </Typography.Text>
              <Tooltip title="Copied" visible={copied === destination}>
                <CopyToClipboard text={destination}>
                  <IonIcon
                    style={{ cursor: 'pointer' }}
                    name="copy-outline"
                    onClick={() => onCopy(destination)}
                  />
                </CopyToClipboard>
              </Tooltip>
            </Space>
          }
        />
      </Col>
    </Row>
  )
}

export default TemplateTransfer
