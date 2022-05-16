import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { SystemProgram } from '@solana/web3.js'
import BN from 'bn.js'

import { Card, Col, Row, Typography } from 'antd'
import ProposalStatus from 'app/components/proposalStatus'
import TemplateInfo from '../modalTemplateInfo/component/templateInfo'

import { shortenAddress } from 'shared/util'
import { AppState } from 'app/model'
import configs from 'app/configs'
import useProposalStatus from 'app/hooks/useProposalStatus'
import useProposalMetaData from 'app/hooks/useProposalMetaData'
import { ProposalChildCardProps } from '../proposalDetails'

const {
  manifest: { appId },
} = configs

export type ProposalCardProps = { proposalAddress: string }

const currentDate = Math.floor(Number(new Date()) / 1000)

const ProposalCard = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  const { proposal } = useSelector((state: AppState) => state)
  const { dao, endDate } = proposal[proposalAddress] || {
    dao: SystemProgram.programId,
    endDate: new BN(currentDate),
  }
  const { status } = useProposalStatus(proposalAddress)
  const history = useHistory()
  const metaData = useProposalMetaData(proposalAddress)
  const endTime = Number(endDate) * 1000
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
      bodyStyle={{ padding: '24px 0' }}
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
        <Col xs={24} md={20}>
          <TemplateInfo
            isProposalDetail={false}
            proposalAddress={proposalAddress}
            daoAddress={daoAddress}
            endTime={endTime}
          />
        </Col>

        <Col span={24}>
          <Typography.Paragraph
            style={{ margin: 0 }}
            type="secondary"
            ellipsis={{ rows: 2 }}
          >
            {metaData?.description}
          </Typography.Paragraph>
        </Col>
      </Row>
    </Card>
  )
}

export default ProposalCard
