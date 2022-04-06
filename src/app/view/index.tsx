import { Row, Col } from 'antd'
import DaoInitialization from './daoInitialization'
import DaoWatcher from './watcher/dao.watcher'
import ProposalWatcher from './watcher/proposal.watcher'
import ReceiptWatcher from './watcher/receipt.watcher'

const View = () => {
  return (
    <Row gutter={[24, 24]} align="middle">
      <Col span={24}>
        <DaoInitialization />
      </Col>
      <DaoWatcher />
      <ProposalWatcher />
      <ReceiptWatcher />
    </Row>
  )
}

export default View
