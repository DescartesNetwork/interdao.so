import { useSelector } from 'react-redux'
import moment from 'moment'

import { Col, Row, Typography } from 'antd'
import RowSpaceVertical from 'components/rowSpaceVertical'
import { PropsTemplateProposalLoader } from '../templateLoader'
import ProposalTemplateCard from '../components/proposalTemplateCard'

import { AppState } from 'model'

import BG_ZETA from 'static/images/templates/bg-zeta.png'

const Proposal = ({ proposalAddress }: PropsTemplateProposalLoader) => {
  const proposalData = useSelector(
    (state: AppState) => state.proposal[proposalAddress],
  )

  const endTime = proposalData.endDate.toNumber() * 1000

  return (
    <ProposalTemplateCard
      proposalAddress={proposalAddress}
      style={{
        background: `url(${BG_ZETA})`,
      }}
    >
      <Row gutter={[12, 12]}>
        <Col xs={12} md={6}>
          <RowSpaceVertical
            label="Template"
            value={
              <Typography.Text className="t-16">Zeta/Create</Typography.Text>
            }
          />
        </Col>

        <Col xs={12} md={6}>
          <RowSpaceVertical
            label="End Time"
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
    </ProposalTemplateCard>
  )
}

export default Proposal
