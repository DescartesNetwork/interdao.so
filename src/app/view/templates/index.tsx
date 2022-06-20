import { useDispatch, useSelector } from 'react-redux'
import { SystemProgram, PublicKey } from '@solana/web3.js'
import { useHistory } from 'react-router-dom'

import { Button, Col, Modal, Row, Tabs, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import SPL from './spl'

import { AppDispatch, AppState } from 'app/model'
import {
  setTemplateName,
  setTx,
  setVisible,
} from 'app/model/template.controller'
import { ProposalAccountType, ProposalReturnType } from './types'
import configs from 'app/configs'

import './index.less'

const {
  manifest: { appId },
} = configs

export enum Templates {
  SPL_TRANSFER = 'spl_transfer',
  BLANK_PROPOSAL = 'blank_proposal',
}

const Template = ({ daoAddress }: { daoAddress: string }) => {
  const visible = useSelector((state: AppState) => state.template.visible)
  const daoData = useSelector((state: AppState) => state.daos[daoAddress])
  const dispatch = useDispatch<AppDispatch>()
  const history = useHistory()

  const addBlankProposal = async () => {
    const { master } = daoData
    const instruction = SystemProgram.transfer({
      fromPubkey: master,
      toPubkey: master,
      lamports: Number(0),
    })

    const re: ProposalReturnType = {
      name: Templates.BLANK_PROPOSAL,
      data: instruction.data,
      accounts: {
        src: instruction.keys[1] as ProposalAccountType,
        dst: instruction.keys[1] as ProposalAccountType,
        payer: {
          pubkey: new PublicKey(master),
          isWritable: true,
          isSigner: true,
          isMaster: true,
        },
      },

      programId: instruction.programId,
    }

    await dispatch(setTx(re))
    await dispatch(setTemplateName(Templates.BLANK_PROPOSAL))
    await dispatch(setVisible(false))
    return history.push(`/app/${appId}/dao/${daoAddress}/new-proposal`)
  }

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
              <Button onClick={addBlankProposal} size="small">
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
