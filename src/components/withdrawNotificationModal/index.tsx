import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Image, Modal, Row, Space, Typography } from 'antd'
import ProposalItem from './proposalItem'

import useWithdrawableReceipt from 'hooks/proposal/useWithdrawableReceipt'
import { useAnchorProvider } from 'hooks/useAnchorProvider'
import { AppState } from 'model'
import { notifyError } from 'helpers'
import BG_JOIN_DAO from 'static/images/system/bg-join-dao.png'

const WithdrawNotificationModal = () => {
  const proposals = useSelector((state: AppState) => state.proposals)
  const daos = useSelector((state: AppState) => state.daos)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const { withdrawableReceipts, withdrawableProposals } =
    useWithdrawableReceipt()
  const provider = useAnchorProvider()

  useEffect(() => {
    if (withdrawableReceipts.length > 0) return setVisible(true)
    setVisible(false)
  }, [withdrawableReceipts])

  const handleWithdrawReceipts = async () => {
    if (!withdrawableReceipts.length) return
    setLoading(true)
    try {
      const txs = await Promise.all(
        withdrawableReceipts.map(async (receipt) => {
          const { isNft } =
            daos[proposals[receipt.proposal.toBase58()].dao.toBase58()]
          if (isNft) {
            const { tx } = await window.interDao.closeNftVoting(
              receipt.address,
              false,
            )
            return { signers: [], tx }
          } else {
            const { tx } = await window.interDao.close(receipt.address, false)
            return { signers: [], tx }
          }
        }),
      )
      await provider.sendAll(txs)
    } catch (er: any) {
      notifyError(er)
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
