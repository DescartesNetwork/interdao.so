import { useState } from 'react'
import { utils } from '@senswap/sen-js'
import CopyToClipboard from 'react-copy-to-clipboard'
import moment from 'moment'

import { Col, Row, Space, Tooltip, Typography } from 'antd'
import RowSpaceBetween from 'app/components/rowSpaceBetween'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import IonIcon from '@sentre/antd-ionicon'
import RowSpaceVertical from 'app/components/rowSpaceVertical'

import useMintDecimals from 'shared/hooks/useMintDecimals'
import { asyncWait, explorer, shortenAddress } from 'shared/util'

export type ApproveType = {
  mint?: string
  amount: number
  source: string
  destination: string
}

const InfoApproveInProposal = ({
  approveInfo,
}: {
  approveInfo?: ApproveType
}) => {
  const [copied, setCopied] = useState('address')
  const {
    mint = '',
    source = '',
    destination = '',
    amount = 0,
  } = approveInfo || {}
  const decimals = useMintDecimals(mint) || 0

  const onCopy = async (address: string) => {
    setCopied(address)
    await asyncWait(1500)
    setCopied('address')
  }

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <RowSpaceBetween label="Template" value="SPL/Approve" />
      </Col>
      <Col span={24}>
        <RowSpaceBetween
          label="Token"
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
          label="Amount"
          value={!mint ? '--' : utils.undecimalize(BigInt(amount), decimals)}
        />
      </Col>
      <Col span={24}>
        <RowSpaceBetween
          label="Provider wallet address"
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
          label="User wallet address"
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
const InfoTransferInDaoDetail = ({
  approveInfo,
  endTime,
}: {
  approveInfo?: ApproveType
  endTime?: number
}) => {
  const { mint = '', amount = 0 } = approveInfo || {}
  const decimals = useMintDecimals(mint) || 0

  return (
    <Row gutter={[12, 12]}>
      <Col xs={12} md={6}>
        <RowSpaceVertical
          label="Template"
          value={
            <Typography.Text className="t-16">SPL/Approve</Typography.Text>
          }
        />
      </Col>
      <Col xs={12} md={6}>
        <RowSpaceVertical
          label="Token"
          value={
            <Typography.Text className="t-16">
              <Space>
                <MintAvatar mintAddress={mint} />
                <MintSymbol mintAddress={mint} />
              </Space>
            </Typography.Text>
          }
        />
      </Col>
      <Col xs={12} md={6}>
        <RowSpaceVertical
          className="t-16"
          label="Amount"
          value={!mint ? '--' : utils.undecimalize(BigInt(amount), decimals)}
        />
      </Col>
      <Col xs={12} md={6}>
        <RowSpaceVertical
          label="End time"
          value={
            endTime && (
              <Typography.Text className="t-16">
                {moment(endTime).format('hh:mm A, MMM Do, YYYY')}
              </Typography.Text>
            )
          }
        />
      </Col>
    </Row>
  )
}

const TemplateApprove = ({
  isProposalDetail,
  approveInfo,
  endTime,
}: {
  approveInfo?: ApproveType
  isProposalDetail?: boolean
  endTime?: number
}) => {
  if (isProposalDetail)
    return <InfoApproveInProposal approveInfo={approveInfo} />
  return <InfoTransferInDaoDetail endTime={endTime} approveInfo={approveInfo} />
}

export default TemplateApprove
