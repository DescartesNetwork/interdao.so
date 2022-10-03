import { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useSetBackground } from '@sentre/senhub'

import { Row, Col } from 'antd'
import Dao from './dao'
import Proposal from './proposal'
import ProposalInitialization from './proposal/proposalInitialization'
import CreateDao from './createDao'
import ProposalDetails from './proposal/proposalDetails'
import EditDAO from './dao/editDao'
import Loading from 'components/loading'
import PageNotFound from 'view/pageNotFound'

import DaoWatcher from '../watcher/dao.watcher'
import ProposalWatcher from '../watcher/proposal.watcher'
import ReceiptWatcher from '../watcher/receipt.watcher'
import EventsWatcher from 'watcher/evens.watch'

import BG from 'static/images/system/bg-dark.png'
import BG_LIGHT from 'static/images/system/bg-light.png'
import configs from 'configs'

import 'static/styles/dark.less'
import 'static/styles/light.less'

const {
  manifest: { appId },
} = configs

const View = () => {
  const setBackground = useSetBackground()

  useEffect(() => {
    setBackground({ light: BG_LIGHT, dark: BG })
  }, [setBackground])

  return (
    <Row gutter={[24, 24]} justify="center">
      <Loading>
        <Col span={24}>
          <Switch>
            <Route exact path={`/app/${appId}/dao`} component={Dao} />
            <Route
              exact
              path={`/app/${appId}/dao/create-dao`}
              component={CreateDao}
            />
            <Route
              exact
              path={`/app/${appId}/dao/:daoAddress/:daoName`}
              component={Proposal}
            />
            <Route
              exact
              path={`/app/${appId}/dao/:daoAddress/:daoName/edit`}
              component={EditDAO}
            />
            <Route
              exact
              path={`/app/${appId}/new-proposal`}
              component={ProposalInitialization}
            />
            <Route
              exact
              path={`/app/${appId}/dao/:daoAddress/:daoName/proposal/:proposalAddress`}
              component={ProposalDetails}
            />
            <Route
              exact
              path={`/app/${appId}/page-not-found`}
              component={PageNotFound}
            />
            <Redirect from="*" to={`/app/${appId}/dao`} />
          </Switch>
        </Col>
      </Loading>
      <Col span={24} />
      <DaoWatcher />
      <ProposalWatcher />
      <ReceiptWatcher />
      <EventsWatcher />
    </Row>
  )
}

export default View
