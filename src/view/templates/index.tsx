import { useDispatch, useSelector } from 'react-redux'

import { Col, Modal, Row, Tabs, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import SPL from './spl'
import Blank from './blank'
import { AppDispatch, AppState } from 'model'
import { clearTemplate } from 'model/template.controller'

import './index.less'
import SenFarming from './senFarming'

const Template = ({ daoAddress }: { daoAddress: string }) => {
  const visible = useSelector((state: AppState) => state.template.visible)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <Modal
      visible={visible}
      footer={false}
      closeIcon={<IonIcon name="close-outline" />}
      className="template-card template-modal"
      onCancel={() => dispatch(clearTemplate())}
    >
      <Row>
        <Col span={24} className="template-header">
          <Typography.Title level={4}>Choose a template</Typography.Title>
        </Col>
        <Col className="template-body" span={24}>
          <Tabs>
            <Tabs.TabPane tab="Blank" key="blank">
              <Blank daoAddress={daoAddress} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="SPL" key="spl">
              <SPL daoAddress={daoAddress} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Sen Farming" key="sen-farming">
              <SenFarming daoAddress={daoAddress} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Zeta" key="zeta" disabled />
            <Tabs.TabPane tab="Atrix" key="atrix" disabled />
            <Tabs.TabPane tab="Quarry" key="quarry" disabled />
            <Tabs.TabPane tab="Advanced" key="advanced" disabled />
          </Tabs>
        </Col>
      </Row>
    </Modal>
  )
}

export default Template
