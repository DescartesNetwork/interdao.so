import { Redirect, Route, Switch } from 'react-router-dom'

import { Row, Col } from 'antd'
import Dao from './dao'
import Proposal from './proposal'
import DaoWatcher from './watcher/dao.watcher'
import ProposalWatcher from './watcher/proposal.watcher'
import ReceiptWatcher from './watcher/receipt.watcher'

import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

const View = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Switch>
          <Route exact path={`/app/${appId}/dao`} component={Dao} />
          <Route
            exact
            path={`/app/${appId}/dao/:daoAddress`}
            component={Proposal}
          />
          <Redirect from="*" to={`/app/${appId}/dao`} />
        </Switch>
      </Col>
      <Col span={24} />
      <DaoWatcher />
      <ProposalWatcher />
      <ReceiptWatcher />
    </Row>
  )
}

export default View
