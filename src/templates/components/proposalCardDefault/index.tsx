import { Fragment } from 'react'
import moment from 'moment'

import { Col, Row, Spin, Typography } from 'antd'
import RowSpaceVertical from 'components/rowSpaceVertical'
import ProposalTemplateCard from '../../components/proposalTemplateCard'
import WrapStatistic from './wrapStatistic'

import useProposal from 'hooks/proposal/useProposal'
import useProposalMetaData from 'hooks/proposal/useProposalMetaData'
import { TemplateConfig } from 'templates/constant'

const ProposalCardDefault = ({
  proposalAddress,
  configs,
  background,
}: {
  proposalAddress: string
  configs: TemplateConfig<any>
  background: string
}) => {
  const proposalData = useProposal(proposalAddress)
  const { metaData } = useProposalMetaData(proposalAddress)

  if (!proposalData || !metaData?.templateData) return <Spin spinning />

  const endTime = proposalData.endDate.toNumber() * 1000
  const templateData = metaData.templateData

  return (
    <ProposalTemplateCard
      proposalAddress={proposalAddress}
      style={{
        background,
      }}
    >
      <Row gutter={[12, 12]}>
        <Col xs={12} md={6}>
          <RowSpaceVertical
            label="Template"
            value={
              <Typography.Text className="t-16">
                {metaData.title}
              </Typography.Text>
            }
          />
        </Col>
        {configs.components.map((cpn) => {
          const prefix = cpn.prefix
          return (
            <Fragment>
              {prefix && (
                <Col xs={12} md={6}>
                  <WrapStatistic
                    configs={prefix}
                    value={templateData[prefix.id]}
                  />
                </Col>
              )}
              <Col xs={12} md={6}>
                <WrapStatistic configs={cpn} value={templateData[cpn.id]} />
              </Col>
            </Fragment>
          )
        })}

        <Col xs={12} md={6}>
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

export default ProposalCardDefault
