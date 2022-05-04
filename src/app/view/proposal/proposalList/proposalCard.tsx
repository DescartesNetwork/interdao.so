import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { SystemProgram } from '@solana/web3.js'
import moment from 'moment'
import BN from 'bn.js'

import { Card, Col, Row, Space, Typography } from 'antd'
import ProposalStatus from 'app/components/proposalStatus'

import { shortenAddress } from 'shared/util'
import { AppState } from 'app/model'
import configs from 'app/configs'
import useProposalStatus from 'app/hooks/useProposalStatus'
import useProposalMetaData from 'app/hooks/useProposalMetaData'

const {
  manifest: { appId },
} = configs

export type ProposalCardProps = { proposalAddress: string }

const currentDate = Math.floor(Number(new Date()) / 1000)

const ProposalCard = ({ proposalAddress }: ProposalCardProps) => {
  const { proposal } = useSelector((state: AppState) => state)
  const { dao, endDate } = proposal[proposalAddress] || {
    dao: SystemProgram.programId,
    endDate: new BN(currentDate),
  }
  const { status } = useProposalStatus(proposalAddress)
  const history = useHistory()
  const metaData = useProposalMetaData(proposalAddress)

  return (
    <Card
      bordered={false}
      onClick={() =>
        history.push(
          `/app/${appId}/dao/${dao.toBase58()}/proposal/${proposalAddress}`,
        )
      }
      className="proposal-card"
      style={{ background: `url(${metaData?.imageBackground})` }}
      hoverable
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row>
            <Col flex="auto">
              <Typography.Title level={4}>
                {metaData?.title
                  ? metaData.title
                  : shortenAddress(proposalAddress)}
              </Typography.Title>
            </Col>
            <Col>
              <ProposalStatus status={status} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Space>
            <Typography.Text className="caption" type="secondary">
              End Date:
            </Typography.Text>
            <Typography.Text className="caption">
              {moment(Number(endDate) * 1000).format('hh:mm A, MMM Do, YYYY')}
            </Typography.Text>
          </Space>
        </Col>
        <Col span={24}>
          <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
            {metaData?.description}
          </Typography.Paragraph>
        </Col>
      </Row>
    </Card>
  )
}

export default ProposalCard
