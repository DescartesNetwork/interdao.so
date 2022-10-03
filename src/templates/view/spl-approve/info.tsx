import { Col, Row, Spin } from 'antd'
import { PropsTemplateProposalLoader } from '../../templateLoader'
import { TemplateInfo } from 'templates/components/templateForm'

import { IDS, TEMPLATE_CONFIGS } from './configs'
import { useTemplateDataWithProposal } from 'templates/hooks/useTemplateDataWithProposal'

const Info = ({ proposalAddress }: PropsTemplateProposalLoader) => {
  const templateData =
    useTemplateDataWithProposal<Record<IDS, string>>(proposalAddress)

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
      <Col span={24} />
    </Row>
  )
}

export default Info
