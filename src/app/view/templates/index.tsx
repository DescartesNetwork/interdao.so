import { useDispatch, useSelector } from 'react-redux'

import { Col, Modal, Row, Tabs, Typography } from 'antd'
import SPL from './spl'

import { AppDispatch, AppState } from 'app/model'
import { setVisible } from 'app/model/template.controller'
import IonIcon from 'shared/antd/ionicon'

import './index.less'

export enum Templates {
  SPL_TRANSFER = 'spl_transfer',
}

const Template = ({ daoAddress }: { daoAddress: string }) => {
  const {
    template: { visible },
  } = useSelector((state: AppState) => state)
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
        <Col span={24}>
          <Typography.Title level={4}>Choose a template</Typography.Title>
        </Col>
        <Col className="template-body" span={24}>
          <Tabs>
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
