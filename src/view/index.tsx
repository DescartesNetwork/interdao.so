import { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useSetBackground } from '@sentre/senhub'

import { Row, Col } from 'antd'
import Loading from 'components/loading'

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
            <Route exact {...APP_ROUTE.listDaos} />
            <Route exact {...APP_ROUTE.createDao} />
            <Route exact {...APP_ROUTE.daoDetails} />
            <Route exact {...APP_ROUTE.editDao} />
            <Route exact {...APP_ROUTE.createProposal} />
            <Route exact {...APP_ROUTE.proposalDetails} />
            <Route exact {...APP_ROUTE.notFound} />
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
