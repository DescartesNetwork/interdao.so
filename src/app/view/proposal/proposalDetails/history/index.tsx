import { ReceiptData } from '@interdao/core'
import { Card, Col, Row, Typography, Table, Button } from 'antd'
import useReceipts from 'app/hooks/useReceipts'
import { useMemo, useState } from 'react'
import IonIcon from 'shared/antd/ionicon'

import { HISTORY_COLUMNS } from './column'

import './index.less'

const DEFAULT_AMOUNT_HISTORY = 5

const History = ({
  proposalAddress,
  daoAddress,
}: {
  proposalAddress: string
  daoAddress: string
}) => {
  const [amount, setAmount] = useState(DEFAULT_AMOUNT_HISTORY)
  const { receipts } = useReceipts({ proposalAddress })

  const filterReceipts = useMemo(() => {
    const nextReceipts: ReceiptData[] = []

    receipts.forEach((receipt) => {
      const { authority, power, action } = receipt
      const actionType = Object.keys(action || {})[0]
      const owner = authority.toBase58()

      const existReceipt = nextReceipts.find((_receipt) => {
        const { action: _action, authority: _authority } = _receipt
        const _actionType = Object.keys(_action || {})[0]
        const _owner = _authority.toBase58()

        return _owner === owner && actionType === _actionType
      })
      if (!existReceipt) return nextReceipts.push(receipt)

      const { power: oldPower } = existReceipt
      const index = nextReceipts.findIndex(
        (_receipt) => _receipt === existReceipt,
      )
      if (index !== -1)
        return (nextReceipts[index] = {
          ...nextReceipts[index],
          power: oldPower.add(power),
        })
    })
    return nextReceipts
  }, [receipts])

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5}> Votes</Typography.Title>
        </Col>
        <Col span={24}>
          <Table
            columns={HISTORY_COLUMNS}
            dataSource={filterReceipts.slice(0, amount)}
            rowClassName={(record, index) =>
              index % 2 ? 'odd-row' : 'even-row'
            }
            pagination={false}
            rowKey={(record) =>
              record.index.toNumber() + record.lockedDate.toNumber()
            }
          />
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button
            disabled={filterReceipts.length <= amount}
            onClick={() => setAmount(amount + DEFAULT_AMOUNT_HISTORY)}
            icon={<IonIcon name="chevron-down-outline" />}
          >
            View more
          </Button>
        </Col>
      </Row>
    </Card>
  )
}
export default History
