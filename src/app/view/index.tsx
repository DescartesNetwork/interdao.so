import { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useUI } from '@senhub/providers'

import { Row, Col } from 'antd'
import Dao from './dao'
import Proposal from './proposal'
import ProposalInitialization from './proposal/proposalInitialization'
import DaoWatcher from './watcher/dao.watcher'
import ProposalWatcher from './watcher/proposal.watcher'
import ReceiptWatcher from './watcher/receipt.watcher'

import BG from 'app/static/images/system/bg.png'
import 'app/static/styles/index.less'
import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

const View = () => {
  const { setBackground } = useUI()

  useEffect(() => {
    setBackground({ light: BG, dark: BG })
  }, [setBackground])
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
          <Route
            exact
            path={`/app/${appId}/dao/:daoAddress/new-proposal`}
            component={ProposalInitialization}
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
