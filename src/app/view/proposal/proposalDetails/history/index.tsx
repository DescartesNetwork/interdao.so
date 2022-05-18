import { useCallback, useEffect, useState } from 'react'
import { ReceiptData } from '@interdao/core'

import { Card, Col, Row, Typography, Table, Button } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { HISTORY_COLUMNS_MULTISIG, HISTORY_COLUMNS_FLEXIBLE } from './column'
import { getReceipts } from 'app/hooks/useReceipts'

import './index.less'
import useMetaData from 'app/hooks/useMetaData'

const DEFAULT_AMOUNT_HISTORY = 5

const History = ({
  proposalAddress,
  daoAddress,
}: {
  proposalAddress: string
  daoAddress: string
}) => {
  const [amount, setAmount] = useState(DEFAULT_AMOUNT_HISTORY)
  const [loading, setLoading] = useState(false)
  const [listReceipt, setListReceipt] = useState<ReceiptData[]>([])
  const metaData = useMetaData(daoAddress)
  const isMultisigDAO = metaData?.daoType === 'multisig-dao'
  const historyColum = isMultisigDAO
    ? HISTORY_COLUMNS_MULTISIG
    : HISTORY_COLUMNS_FLEXIBLE

  const fetchReceipts = useCallback(async () => {
    setLoading(true)
    const receipts = await getReceipts(proposalAddress)
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
    setLoading(false)
    return setListReceipt(nextReceipts)
  }, [proposalAddress])

  useEffect(() => {
    fetchReceipts()
  }, [fetchReceipts])

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row>
            <Col flex="auto">
              <Typography.Title level={5}> Votes</Typography.Title>
            </Col>
            <Col>
              <Button onClick={fetchReceipts}>Refresh</Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Table
            columns={historyColum}
            dataSource={listReceipt.slice(0, amount)}
            pagination={false}
            loading={loading}
            rowKey={({ index, lockedDate }) =>
              index.toNumber() + lockedDate.toNumber()
            }
          />
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button
            disabled={listReceipt.length <= amount}
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
