import { Col, Modal, Row, Typography } from 'antd'

import { ProposalChildCardProps } from '../proposalDetails/index'
import TemplateInfo from './component/templateInfo'

type TemplateInfoProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
} & ProposalChildCardProps

const ModalTemplateInfo = ({
  proposalAddress,
  daoAddress,
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
          <TemplateInfo
            proposalAddress={proposalAddress}
            daoAddress={daoAddress}
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalTemplateInfo
