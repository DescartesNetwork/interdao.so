import { Col, Row, Spin } from 'antd'
import { PropsTemplateProposalLoader } from '../../templateLoader'
import { TemplateInfo } from 'templates/components/templateForm'

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
          components={[
            {
              id: 'url',
              type: 'address',
              title: 'URL',
            },
            {
              id: 'appId',
              type: 'address',
              title: 'App ID',
            },
          ]}
          onChange={() => {}}
        />
      </Col>
    </Row>
  )
}

export default Info
