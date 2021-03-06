import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { util } from '@sentre/senhub'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Image, Modal, Row, Space, Typography } from 'antd'
import ProposalItem from './proposalItem'

import useWithdrawableReceipt from 'hooks/proposal/useWithdrawableReceipt'
import { AppState } from 'model'
import configs from 'configs'

import BG_JOIN_DAO from 'static/images/system/bg-join-dao.png'

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
    if (withdrawableReceipts.length > 0) return setVisible(true)
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
          onClick: () => window.open(util.explorer(response.txId), '_blank'),
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
      bodyStyle={{ padding: '72px 24px 24px 24px' }}
      className="join-dao"
    >
      <Image preview={false} src={BG_JOIN_DAO} />
      <Row gutter={[32, 32]} className="join-dao_content">
        <Col span={24}>
          <Space
            direction="vertical"
            size={12}
            align="center"
            style={{ width: '100%' }}
          >
            <Typography.Title className="join-dao_title" level={2}>
              Voting is over!
            </Typography.Title>
            <Typography.Text type="secondary">
              Your tokens and NFTs can be withdrawn from the proposals below.
            </Typography.Text>
          </Space>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            {Object.keys(withdrawableProposals).map((value) => {
              return (
                <Col span={24} key={value}>
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
