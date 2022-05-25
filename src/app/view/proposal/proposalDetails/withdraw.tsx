import { Fragment, useCallback, useEffect, useState } from 'react'
import { useWallet } from '@senhub/providers'
import { ReceiptData } from '@interdao/core'
import BN from 'bn.js'
import moment from 'moment'

import { Button, Col, Modal, Row, Space, Typography, Table } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ColumnType from './history/columnType'
import ColumnPower from './history/columnPower'

import { ProposalChildCardProps } from './index'
import useReceipts from 'app/hooks/useReceipts'
import configs from 'app/configs'
import { explorer } from 'shared/util'

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
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const filterReceipts = useCallback(() => {
    const listRecept = Object.keys(receipts).map((address) => {
      return { address, ...receipts[address] }
    })

    setListReceipt(
      listRecept.filter(
        (receipt) => receipt.authority.toBase58() === walletAddress,
      ),
    )
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
    const nextReceiptAddress = [...listReceipt]

    setLoading(true)
    try {
      for (const address of receiptAddress) {
        const { txId } = await interDao.close(address)
        window.notify({
          type: 'success',
          description: 'Close receipt successfully. Click to view details!',
          onClick: () => window.open(explorer(txId), '_blank'),
        })
      }

      //for real time
      setListReceipt(
        nextReceiptAddress.filter(
          (receipt) => !receiptAddress.includes(receipt.address),
        ),
      )
    } catch (error: any) {
      window.notify({
        type: 'error',
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }, [listReceipt, receiptAddress])

  useEffect(() => {
    filterReceipts()
  }, [filterReceipts])

  return (
    <Fragment>
      <Button
        onClick={() => setVisible(true)}
        icon={<IonIcon name="log-out-outline" />}
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
