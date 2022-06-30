import { useEffect } from 'react'
import { useUI } from '@sentre/senhub'
import { Redirect, Route, Switch } from 'react-router-dom'

import { Row, Col } from 'antd'
import Dao from './dao'
import Proposal from './proposal'
import ProposalInitialization from './proposal/proposalInitialization'
import CreateDao from './createDao'
import ProposalDetails from './proposal/proposalDetails'
import EditDAO from './dao/editDao'
import Loading from 'components/loading'

import DaoWatcher from '../watcher/dao.watcher'
import ProposalWatcher from '../watcher/proposal.watcher'
import ReceiptWatcher from '../watcher/receipt.watcher'
import MetadataWatcher from '../watcher/metadata.watcher'

import BG from 'static/images/system/bg-dark.png'
import BG_LIGHT from 'static/images/system/bg-light.png'
import configs from 'configs'

import 'static/styles/dark.less'
import 'static/styles/light.less'
import EventsWatcher from 'watcher/evens.watch'

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
      <Loading>
        <Col span={24}>
          <Switch>
            <Route exact path={`/${appId}/dao`} component={Dao} />
            <Route
              exact
              path={`/${appId}/dao/create-dao`}
              component={CreateDao}
            />
            <Route
              exact
              path={`/${appId}/dao/:daoAddress`}
              component={Proposal}
            />
            <Route
              exact
              path={`/${appId}/dao/:daoAddress/edit`}
              component={EditDAO}
            />
            <Route
              exact
              path={`/${appId}/dao/:daoAddress/new-proposal`}
              component={ProposalInitialization}
            />
            <Route
              exact
              path={`/${appId}/dao/:daoAddress/proposal/:proposalAddress`}
              component={ProposalDetails}
            />
            <Redirect from="*" to={`/${appId}/dao`} />
          </Switch>
        </Col>
      </Loading>
      <Col span={24} />
      <DaoWatcher />
      <ProposalWatcher />
      <ReceiptWatcher />
      <EventsWatcher />
      <MetadataWatcher />
    </Row>
  )
}

export default View
