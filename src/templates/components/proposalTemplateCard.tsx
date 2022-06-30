import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Card, CardProps, Col, Row, Typography } from 'antd'

import useProposalMetaData from 'hooks/proposal/useProposalMetaData'
import { AppState } from 'model'
import configs from 'configs'
import ProposalStatus from 'components/proposalStatus'
import useProposalStatus from 'hooks/proposal/useProposalStatus'
import { util } from '@sentre/senhub'

const {
  manifest: { appId },
} = configs

type PropProposalTemplateCard = {
  proposalAddress: string
} & CardProps

const ProposalTemplateCard: React.FC<PropProposalTemplateCard> = ({
  proposalAddress,
  ...rest
}) => {
  const history = useHistory()
  const proposalData = useSelector(
    (state: AppState) => state.proposal[proposalAddress],
  )
  const { metaData } = useProposalMetaData(proposalAddress)
  const { status } = useProposalStatus(proposalAddress)
  const daoAddress = proposalData.dao.toBase58()
  return (
    <Card
      bordered={false}
      onClick={() =>
        history.push(`/${appId}/dao/${daoAddress}/proposal/${proposalAddress}`)
      }
      className="proposal-card"
      bodyStyle={{ padding: '24px 0', minHeight: 150 }}
      hoverable
      {...rest}
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row>
            <Col flex="auto">
              <Typography.Title level={4}>
                {metaData?.title
                  ? metaData.title
                  : util.shortenAddress(proposalAddress)}
              </Typography.Title>
            </Col>
            <Col>
              <ProposalStatus status={status} />
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={20}>
          {rest.children}
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

export default ProposalTemplateCard
