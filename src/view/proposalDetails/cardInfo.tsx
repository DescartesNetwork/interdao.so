import { useMemo, useState } from 'react'
import moment from 'moment'
import CopyToClipboard from 'react-copy-to-clipboard'
import { util } from '@sentre/senhub'

import { Card, Col, Row, Space, Typography, Tooltip, Button } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import ModalTemplateInfo from '../proposalList/modalTemplateInfo'
import RowSpaceBetween from 'components/rowSpaceBetween'

import useProposal from 'hooks/proposal/useProposal'
import { ProposalChildCardProps } from './index'
import useParseQuorumText from 'hooks/proposal/useParseQuorumText'

const CardInfo = ({ proposalAddress, daoAddress }: ProposalChildCardProps) => {
  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(false)
  const { consensusQuorum, startDate, endDate, consensusMechanism, creator } =
    useProposal(proposalAddress)
  const authProposalAddress = creator?.toBase58() || ''
  const quorum = useParseQuorumText(consensusQuorum)

  const onCopy = async () => {
    setCopied(true)
    await util.asyncWait(1500)
    setCopied(false)
  }

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
                style={{ marginRight: -10 }}
                onClick={() => setVisible(true)}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Space style={{ width: '100%' }} direction="vertical">
            <RowSpaceBetween
              label="Proposal ID"
              value={util.shortenAddress(proposalAddress, 3)}
            />
            <RowSpaceBetween
              label="Start Time"
              value={moment(startDate?.toNumber() * 1000).format(
                'MMM DD,yyyy HH:mm',
              )}
            />
            <RowSpaceBetween
              label="End Time"
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
                      window.open(util.explorer(authProposalAddress), '_blank')
                    }
                  >
                    {util.shortenAddress(authProposalAddress, 3)}
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
            <RowSpaceBetween label="Vote Method" value={consensus} />
          </Space>
        </Col>
      </Row>
      <ModalTemplateInfo
        setVisible={setVisible}
        visible={visible}
        proposalAddress={proposalAddress}
      />
    </Card>
  )
}

export default CardInfo
