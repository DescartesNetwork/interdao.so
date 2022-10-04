import { Col, Row, Spin } from 'antd'
import { PropsTemplateProposalLoader } from '../../templateLoader'
import { TemplateInfo } from 'templates/components/templateForm'

import { TEMPLATE_CONFIGS } from './configs'
import useProposalMetaData from 'hooks/proposal/useProposalMetaData'

const Info = ({ proposalAddress }: PropsTemplateProposalLoader) => {
  const proposalMetaData = useProposalMetaData(proposalAddress)
  const templateData = proposalMetaData.metaData?.templateData

  if (!templateData) return <Spin spinning />

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <TemplateInfo
          templateData={templateData}
          components={TEMPLATE_CONFIGS.components}
          onChange={() => {}}
        />
      </Col>
    </Row>
  )
}

export default Info
