import { Col, Modal, Row, Typography } from 'antd'
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
          <Typography.Title level={4}>Template information</Typography.Title>
        </Col>
        <Col span={24} className="template-info-body">
          <TemplateInfoLoader proposalAddress={proposalAddress} />
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalTemplateInfo
