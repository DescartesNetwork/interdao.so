import { useEffect } from 'react'
import { useUI } from '@senhub/providers'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Row, Col } from 'antd'
import Dao from './dao'
import Proposal from './proposal'
import ProposalInitialization from './proposal/proposalInitialization'
import DaoInitialization from './dao/daoInitialization'
import ProposalDetails from './proposal/proposalDetails'
import DaoWatcher from './watcher/dao.watcher'
import ProposalWatcher from './watcher/proposal.watcher'
import ReceiptWatcher from './watcher/receipt.watcher'

import 'app/static/styles/dark.less'
import 'app/static/styles/light.less'
import configs from 'app/configs'
import BG from 'app/static/images/system/bg-dark.png'

const {
  manifest: { appId },
} = configs

const View = () => {
  const { setBackground } = useUI()

  useEffect(() => {
    setBackground({ light: undefined, dark: BG })
  }, [setBackground])

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={24}>
        <Switch>
          <Route exact path={`/app/${appId}/dao`} component={Dao} />
          <Route
            exact
            path={`/app/${appId}/dao/new-dao`}
            component={DaoInitialization}
          />
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
          <Route
            exact
            path={`/app/${appId}/dao/:daoAddress/proposal/:proposalAddress`}
            component={ProposalDetails}
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
