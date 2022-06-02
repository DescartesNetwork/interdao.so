import { Fragment, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@senhub/providers'
import { DaoData, ReceiptData } from '@interdao/core'
import BN from 'bn.js'
import moment from 'moment'

import { Button, Col, Modal, Row, Space, Typography, Table } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import ColumnType from './history/columnType'
import ColumnPower from './history/columnPower'

import { ProposalChildCardProps } from './index'
import useReceipts from 'app/hooks/proposal/useReceipts'
import configs from 'app/configs'
import { explorer } from 'shared/util'
import { AppState } from 'app/model'

const COLUMNS = [
  {
    title: 'TIME',
    dataIndex: 'lockedDate',
    render: (lockedDate: BN) => (
      <Typography.Text>
        {moment(lockedDate.toNumber() * 1000).format('DD/MM/YYYY HH:mm')}
      </Typography.Text>
    ),
  },
  {
    title: 'POWER',
    dataIndex: 'power',
    render: (_: any, receipt: ReceiptData) => <ColumnPower receipt={receipt} />,
  },
  {
    title: 'TYPE',
    dataIndex: 'authority',
    render: (_: any, receipt: ReceiptData) => <ColumnType record={receipt} />,
  },
]

export type Receipt = ReceiptData & { address: string }

const {
  sol: { interDao },
} = configs

const Withdraw = ({ daoAddress, proposalAddress }: ProposalChildCardProps) => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [listReceipt, setListReceipt] = useState<Receipt[]>([])
  const [receiptAddress, setReceiptAddress] = useState<string[]>([])
  const { receipts } = useReceipts({ proposalAddress })
  const { daos } = useSelector((state: AppState) => state.dao)
  const { isNft } = daos[daoAddress] || ({} as DaoData)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const filterReceipts = useCallback(() => {
    const listRecept = Object.keys(receipts).map((address) => ({
      address,
      ...receipts[address],
    }))

    const myRecept: Receipt[] = listRecept.filter(
      (receipt) => receipt.authority.toBase58() === walletAddress,
    )

    return setListReceipt(myRecept)
  }, [receipts, walletAddress])

  const onSelect = (_: React.Key[], receipts: Receipt[]) => {
    const addresses: string[] = []
    for (const { address } of receipts) {
      addresses.push(address)
    }
    return setReceiptAddress(addresses)
  }

  const onConfirm = useCallback(async () => {
    if (!receiptAddress.length) return
    setLoading(true)
    try {
      for (const address of receiptAddress) {
        let response: { txId: string; receiptAddress: string }

        if (isNft) response = await interDao.closeNftVoting(address)
        else response = await interDao.close(address)

        window.notify({
          type: 'success',
          description: 'Close receipt successfully. Click to view details!',
          onClick: () => window.open(explorer(response.txId), '_blank'),
        })
      }
      //for real time
      setListReceipt(
        [...listReceipt].filter(
          (receipt) => !receiptAddress.includes(receipt.address),
        ),
      )
    } catch (er: any) {
      window.notify({
        type: 'error',
        description: er.message,
      })
    } finally {
      setLoading(false)
    }
  }, [isNft, listReceipt, receiptAddress])

  useEffect(() => {
    filterReceipts()
  }, [filterReceipts])

  return (
    <Fragment>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        block
        size="large"
        disabled={!listReceipt.length}
      >
        Withdraw
      </Button>
      <Modal
        visible={visible}
        footer={null}
        closeIcon={<IonIcon name="close-outline" />}
        onCancel={() => setVisible(false)}
      >
        <Row gutter={[32, 32]}>
          <Col span={24}>
            <Typography.Title level={4}>Withdraw</Typography.Title>
          </Col>
          <Col span={24}>
            <Table
              rowSelection={{ type: 'checkbox', onChange: onSelect }}
              columns={COLUMNS}
              dataSource={listReceipt}
              pagination={false}
              rowKey={({ index, lockedDate }) =>
                index.toNumber() + lockedDate.toNumber()
              }
            />
          </Col>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setVisible(false)}>Cancel</Button>
              <Button loading={loading} onClick={onConfirm} type="primary">
                Confirm
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default Withdraw
