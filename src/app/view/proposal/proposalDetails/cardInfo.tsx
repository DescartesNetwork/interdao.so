import moment from 'moment'

import { Card, Col, Row, Space, Typography } from 'antd'

import { ProposalChildCardProps } from './index'
import useProposal from 'app/hooks/useProposal'
import { shortenAddress } from 'shared/util'

type RowSpaceBetweenProps = {
  label?: string
  value?: string
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
  const { consensusQuorum, startDate, endDate, consensusMechanism } =
    useProposal(proposalAddress, daoAddress)

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5}>Infomation</Typography.Title>
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
            <RowSpaceBetween label="Author" value={'1'} />
            <RowSpaceBetween
              label="Quorum"
              value={consensusQuorum ? Object.keys(consensusQuorum)[0] : '1/2'}
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
