import { Card, Col, Row, Typography, Table } from 'antd'
import useReceipts from 'app/hooks/useReceipts'

import { HISTORY_COLUMNS } from './column'

import './index.less'

const History = ({
  proposalAddress,
  daoAddress,
}: {
  proposalAddress: string
  daoAddress: string
}) => {
  const tmp = useReceipts({ proposalAddress })
  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5}> Votes</Typography.Title>
        </Col>
        <Col span={24}>
          <Table
            columns={HISTORY_COLUMNS}
            dataSource={[]}
            rowClassName={(record, index) =>
              index % 2 ? 'odd-row' : 'even-row'
            }
            pagination={false}
          />
        </Col>
      </Row>
    </Card>
  )
}

export default History
