import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import ProposalItem from './proposalItem'

import useWithdrawableReceipt from 'app/hooks/proposal/useWithdrawableReceipt'
import { AppState } from 'app/model'
import configs from 'app/configs'
import { explorer } from 'shared/util'

import BG_JOIN_DAO from 'app/static/images/system/bg-join-dao.png'

const {
  sol: { interDao },
} = configs

const WithdrawNotificationModal = () => {
  const proposals = useSelector((state: AppState) => state.proposal)
  const daos = useSelector((state: AppState) => state.daos)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const { withdrawableReceipts, withdrawableProposals } =
    useWithdrawableReceipt()

  useEffect(() => {
    if (withdrawableReceipts.length > 0) {
      return setVisible(true)
    }
    setVisible(false)
  }, [withdrawableReceipts])

  const handleWithdrawReceipts = async () => {
    if (!withdrawableReceipts.length) return
    setLoading(true)
    try {
      for (const receipt of withdrawableReceipts) {
        let response: { txId: string; receiptAddress: string }
        const { isNft } =
          daos[proposals[receipt.proposal.toBase58()].dao.toBase58()]
        if (isNft) response = await interDao.closeNftVoting(receipt.address)
        else response = await interDao.close(receipt.address)
        window.notify({
          type: 'success',
          description: 'Successful withdrawal. Click to view details!',
          onClick: () => window.open(explorer(response.txId), '_blank'),
        })
      }
    } catch (er: any) {
      window.notify({
        type: 'error',
        description: er.message,
      })
    } finally {
      setLoading(false)
      setVisible(false)
    }
  }

  return (
    <Modal
      visible={visible}
      onCancel={() => {
        setVisible(false)
      }}
      closeIcon={<IonIcon name="close-outline" />}
      footer={null}
      bodyStyle={{
        padding: '48px 24px 24px 24px',
        backgroundImage: `url(${BG_JOIN_DAO})`,
      }}
    >
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <Space
            direction="vertical"
            size={12}
            align="center"
            style={{ width: '100%' }}
          >
            <Typography.Title level={1}>Voting is over!</Typography.Title>
            <Typography.Text style={{ color: '#A08D70' }}>
              Your tokens and NFTs can be withdrawn from the proposals below.
            </Typography.Text>
          </Space>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            {Object.keys(withdrawableProposals).map((value, index) => {
              return (
                <Col span={24}>
                  <ProposalItem proposalAddress={value} />
                </Col>
              )
            })}
          </Row>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            block
            onClick={handleWithdrawReceipts}
            loading={loading}
            style={{ height: 40 }}
          >
            Withdraw
          </Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default WithdrawNotificationModal
