import { useSelector } from 'react-redux'

import { Col, Row, Typography } from 'antd'
import ProposalStatus from 'app/components/proposalStatus'
import TemplateInfo from 'app/view/proposal/modalTemplateInfo/component/templateInfo'
import { PropsTemplateProposalLoader } from '../templateLoader'
import ProposalTemplateCard from '../components/proposalTemplateCard'

import useProposalMetaData from 'app/hooks/proposal/useProposalMetaData'
import useProposalStatus from 'app/hooks/proposal/useProposalStatus'
import { shortenAddress } from 'shared/util'
import { AppState } from 'app/model'

import BG_SOLANA from 'app/static/images/templates/bg-spl.png'

const Proposal = ({ proposalAddress }: PropsTemplateProposalLoader) => {
  const proposalData = useSelector(
    (state: AppState) => state.proposal[proposalAddress],
  )
  const { metaData } = useProposalMetaData(proposalAddress)
  const { status } = useProposalStatus(proposalAddress)

  const daoAddress = proposalData.dao.toBase58()
  const endDate = proposalData.endDate.toNumber()

  return (
    <ProposalTemplateCard
      proposalAddress={proposalAddress}
      style={{
        background: `url(${BG_SOLANA})`,
      }}
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
            endTime={Number(endDate) * 1000}
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
    </ProposalTemplateCard>
  )
}

export default Proposal
