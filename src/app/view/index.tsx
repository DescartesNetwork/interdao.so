import { useEffect } from 'react'
import { useUI } from '@senhub/providers'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Row, Col } from 'antd'
import Dao from './dao'
import Proposal from './proposal'
import ProposalInitialization from './proposal/proposalInitialization'
import DaoInitialization from './dao/daoInitialization'
import ProposalDetails from './proposal/proposalDetails'
import EditDAO from './dao/editDao'
import DaoWatcher from './watcher/dao.watcher'
import ProposalWatcher from './watcher/proposal.watcher'
import ReceiptWatcher from './watcher/receipt.watcher'
import MetadataWatcher from './watcher/metadata.watcher'

import BG from 'app/static/images/system/bg-dark.png'
import BG_LIGHT from 'app/static/images/system/bg-light.png'
import configs from 'app/configs'

import 'app/static/styles/dark.less'
import 'app/static/styles/light.less'

const {
  manifest: { appId },
} = configs

const View = () => {
  const { setBackground } = useUI()

  useEffect(() => {
    setBackground({ light: BG_LIGHT, dark: BG })
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
            path={`/app/${appId}/dao/:daoAddress/edit`}
            component={EditDAO}
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
      <MetadataWatcher />
    </Row>
  )
}

export default View
