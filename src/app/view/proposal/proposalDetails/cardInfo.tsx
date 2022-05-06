import { ReactNode, useMemo, useState } from 'react'
import moment from 'moment'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Card, Col, Row, Space, Typography, Tooltip, Button } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import useProposal from 'app/hooks/useProposal'
import { asyncWait, explorer, shortenAddress } from 'shared/util'
import { ProposalChildCardProps } from './index'

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

  const quorum = useMemo(() => {
    if (!consensusQuorum) return '-'
    const mechanismQuorum = Object.keys(consensusQuorum)[0]
    if (mechanismQuorum === 'half') return '1/2'
    if (mechanismQuorum === 'oneThird') return '1/3'
    if (mechanismQuorum === 'twoThird') return '2/3'
  }, [consensusQuorum])

  const consensus = useMemo(() => {
    if (!consensusMechanism) return '-'
    const _consensusMechanism = Object.keys(consensusMechanism)[0]
    if (_consensusMechanism === 'stakedTokenCounter') return 'Staked counter'
    if (_consensusMechanism === 'lockedTokenCounter') return 'Locked counter'
  }, [consensusMechanism])

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row align="middle">
            <Col flex="auto">
              <Typography.Title level={5}>Information</Typography.Title>
            </Col>
            <Col>
              <Button
                type="text"
                icon={<IonIcon name="information-circle-outline" />}
              />
            </Col>
          </Row>
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
            <RowSpaceBetween label="Quorum" value={quorum} />
            <RowSpaceBetween label="Vote method" value={consensus} />
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default CardInfo
