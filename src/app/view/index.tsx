import { Row, Col, Typography, Space } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import DaoWatcher from './watcher/dao.watcher'
import ProposalWatcher from './watcher/proposal.watcher'
import ReceiptWatcher from './watcher/receipt.watcher'

const View = () => {
  return (
    <Row gutter={[24, 24]} align="middle">
      <Col span={24}>
        <Space align="center">
          <IonIcon name="newspaper-outline" />
          <Typography.Title level={4}>App View</Typography.Title>
        </Space>
      </Col>
      <DaoWatcher />
      <ProposalWatcher />
      <ReceiptWatcher />
    </Row>
  )
}

export default View
