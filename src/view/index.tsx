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

import 'static/styles/dark.less'
import 'static/styles/light.less'
import { APP_ROUTE } from 'configs/route'

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
            <Route exact path={APP_ROUTE.listDaos.path} component={Dao} />
            <Route
              exact
              path={APP_ROUTE.createDao.path}
              component={CreateDao}
            />
            <Route
              exact
              path={APP_ROUTE.daoDetails.path}
              component={Proposal}
            />
            <Route exact path={APP_ROUTE.editDao.path} component={EditDAO} />
            <Route
              exact
              path={APP_ROUTE.createProposal.path}
              component={ProposalInitialization}
            />
            <Route
              exact
              path={APP_ROUTE.proposalDetails.path}
              component={ProposalDetails}
            />
            <Route
              exact
              path={APP_ROUTE.notFound.path}
              component={PageNotFound}
            />
            <Redirect from="*" to={APP_ROUTE.listDaos.path} />
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
