import { useDispatch, useSelector } from 'react-redux'

import { Button, Col, Modal, Row, Tabs, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import SPL from './spl'

import { AppDispatch, AppState } from 'app/model'
import { setVisible } from 'app/model/template.controller'

import './index.less'

const Template = ({ daoAddress }: { daoAddress: string }) => {
  const visible = useSelector((state: AppState) => state.template.visible)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <Modal
      visible={visible}
      footer={false}
      closeIcon={<IonIcon name="close-outline" />}
      className="template-card template-modal"
      onCancel={() => dispatch(setVisible(false))}
    >
      <Row>
        <Col span={24} className="template-header">
          <Typography.Title level={4}>Choose a template</Typography.Title>
        </Col>
        <Col className="template-body" span={24}>
          <Tabs
            tabBarExtraContent={
              <Button onClick={() => {}} size="small">
                New blank proposal
              </Button>
            }
          >
            <Tabs.TabPane tab="SPL" key="spl">
              <SPL daoAddress={daoAddress} />
            </Tabs.TabPane>
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
