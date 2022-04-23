import { ReactNode, useState } from 'react'
import moment from 'moment'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Card, Col, Row, Space, Typography, Tooltip } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import { ProposalChildCardProps } from './index'

import useProposal from 'app/hooks/useProposal'
import { asyncWait, explorer, shortenAddress } from 'shared/util'

type RowSpaceBetweenProps = {
  label?: string
  value?: string | ReactNode
}

const RowSpaceBetween = ({ label = '', value = '' }: RowSpaceBetweenProps) => {
  return (
    <Row gutter={[24, 24]}>
      <Col flex="auto">{label}</Col>
      <Col>{value}</Col>
    </Row>
  )
}

const CardInfo = ({ proposalAddress, daoAddress }: ProposalChildCardProps) => {
  const [copied, setCopied] = useState(false)
  const { consensusQuorum, startDate, endDate, consensusMechanism, creator } =
    useProposal(proposalAddress, daoAddress)
  const authProposalAddress = creator?.toBase58() || ''

  const onCopy = async () => {
    setCopied(true)
    await asyncWait(1500)
    setCopied(false)
  }

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5}>Information</Typography.Title>
        </Col>
        <Col span={24}>
          <Space style={{ width: '100%' }} direction="vertical">
            <RowSpaceBetween
              label="Proposal ID"
              value={shortenAddress(proposalAddress, 3)}
            />
            <RowSpaceBetween
              label="Start time"
              value={moment(startDate?.toNumber() * 1000).format(
                'MMM DD,yyyy HH:mm',
              )}
            />
            <RowSpaceBetween
              label="End time"
              value={moment(endDate?.toNumber() * 1000).format(
                'MMM DD,yyyy HH:mm',
              )}
            />
            <RowSpaceBetween
              label="Author"
              value={
                <Space size={10}>
                  <Typography.Text
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() =>
                      window.open(explorer(authProposalAddress), '_blank')
                    }
                  >
                    {shortenAddress(authProposalAddress, 3)}
                  </Typography.Text>
                  <Tooltip title="Copied" visible={copied}>
                    <CopyToClipboard text={authProposalAddress} onCopy={onCopy}>
                      <IonIcon
                        style={{ cursor: 'pointer' }}
                        name="copy-outline"
                        onClick={onCopy}
                      />
                    </CopyToClipboard>
                  </Tooltip>
                </Space>
              }
            />
            <RowSpaceBetween
              label="Quorum"
              value={consensusQuorum ? Object.keys(consensusQuorum)[0] : '-'}
            />
            <RowSpaceBetween
              label="Vote method"
              value={
                consensusMechanism ? Object.keys(consensusMechanism)[0] : ''
              }
            />
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default CardInfo
