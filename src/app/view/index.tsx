import { useEffect } from 'react'
import { useUI } from '@senhub/providers'

import { Row, Col } from 'antd'
import ListDAO from 'app/view/listDAO'

import DaoWatcher from './watcher/dao.watcher'
import ProposalWatcher from './watcher/proposal.watcher'
import ReceiptWatcher from './watcher/receipt.watcher'

import BG from 'app/static/images/system/bg.png'
import 'app/static/styles/index.less'

const View = () => {
  const { setBackground } = useUI()

  useEffect(() => {
    setBackground({ light: BG, dark: BG })
  }, [setBackground])
  return (
    <Row gutter={[24, 24]} style={{ paddingBottom: 24 }} align="middle">
      <Col span={24}>
        <ListDAO />
      </Col>
      <DaoWatcher />
      <ProposalWatcher />
      <ReceiptWatcher />
    </Row>
  )
}

export default View
