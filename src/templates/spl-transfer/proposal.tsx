import { useSelector } from 'react-redux'
import moment from 'moment'

import { Col, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from '@sen-use/app'
import RowSpaceVertical from 'components/rowSpaceVertical'
import { PropsTemplateProposalLoader } from '../templateLoader'
import ProposalTemplateCard from '../components/proposalTemplateCard'

import { AppState } from 'model'
import { useTemplateDataWithProposal } from '../hooks/useTemplateDataWithProposal'
import { SplTransferIds } from './configs'

import BG_SOLANA from 'static/images/templates/bg-spl.png'

const Proposal = ({ proposalAddress }: PropsTemplateProposalLoader) => {
  const proposalData = useSelector(
    (state: AppState) => state.proposal[proposalAddress],
  )
  const templateData =
    useTemplateDataWithProposal<Record<SplTransferIds, string>>(proposalAddress)

  const endTime = proposalData.endDate.toNumber() * 1000
  const mint = templateData.mint

  return (
    <ProposalTemplateCard
      proposalAddress={proposalAddress}
      style={{
        background: `url(${BG_SOLANA})`,
      }}
    >
      <Row gutter={[12, 12]}>
        <Col xs={12} md={6}>
          <RowSpaceVertical
            label="Template"
            value={
              <Typography.Text className="t-16">SPL/Transfer</Typography.Text>
            }
          />
        </Col>
        <Col xs={12} md={6}>
          <RowSpaceVertical
            label="Token To Be Transferred"
            value={
              <Typography.Text className="t-16">
                <Space>
                  <MintAvatar mintAddress={mint} />
                  <MintSymbol mintAddress={mint} />
                </Space>
              </Typography.Text>
            }
          />
        </Col>
        <Col xs={12} md={6}>
          <RowSpaceVertical
            className="t-16"
            label="Transfer Amount"
            value={!mint ? '--' : templateData.amount}
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
