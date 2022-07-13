import { Col, Row } from 'antd'
import { PropsTemplateProposalLoader } from '../templateLoader'
import RowSpaceBetween from 'components/rowSpaceBetween'

const Proposal = ({ proposalAddress }: PropsTemplateProposalLoader) => {
  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <RowSpaceBetween label="Template" value="Zeta/Create" />
      </Col>
    </Row>
  )
}

export default Proposal
