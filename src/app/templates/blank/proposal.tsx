import { useSelector } from 'react-redux'
import moment from 'moment'

import { Col, Row, Typography } from 'antd'
import RowSpaceVertical from 'app/components/rowSpaceVertical'
import { PropsTemplateProposalLoader } from '../templateLoader'
import ProposalTemplateCard from '../components/proposalTemplateCard'
import { AppState } from 'app/model'

import BG_BLANK from 'app/static/images/templates/bg-blank.png'

const Proposal = ({ proposalAddress }: PropsTemplateProposalLoader) => {
  const proposalData = useSelector(
    (state: AppState) => state.proposal[proposalAddress],
  )

  const endTime = proposalData.endDate.toNumber()

  return (
    <ProposalTemplateCard
      proposalAddress={proposalAddress}
      style={{
        background: `url(${BG_BLANK})`,
      }}
    >
      <Row gutter={[12, 12]} justify="space-between">
        <Col>
          <RowSpaceVertical
            label="Template"
            value={<Typography.Text className="t-16">Blank</Typography.Text>}
          />
        </Col>

        <Col>
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
    </ProposalTemplateCard>
  )
}

export default Proposal
