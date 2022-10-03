import { Col, Modal, Row, Typography } from 'antd'
import useProposalMetaData from 'hooks/proposal/useProposalMetaData'
import { TemplateInfoLoader } from 'templates/templateLoader'

type TemplateInfoProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  proposalAddress: string
}

const ModalTemplateInfo = ({
  proposalAddress,
  visible,
  setVisible,
}: TemplateInfoProps) => {
  const { metaData } = useProposalMetaData(proposalAddress)
  return (
    <Modal
      className="template-card template-info"
      visible={visible}
      footer={false}
      onCancel={() => setVisible(false)}
    >
      <Row>
        <Col
          className="template-info-header"
          span={24}
          style={{ textAlign: 'left' }}
        >
          <Typography.Title level={4}>
            {metaData?.templateConfig.title}
          </Typography.Title>
        </Col>
        <Col span={24} className="template-info-body">
          <TemplateInfoLoader proposalAddress={proposalAddress} />
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalTemplateInfo
