import { Col, DatePicker, Row, Space, Typography } from 'antd'
import moment from 'moment'

export type DurationInputType = {
  value: Array<number>
  onChange: (value: Array<number>) => void
}

const DurationInput = ({ value, onChange }: DurationInputType) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text>Proposal Duration</Typography.Text>
      </Col>
      <Col span={24}>
        <Space>
          <DatePicker
            placeholder="Start Date"
            value={moment(value[0])}
            onChange={(e) => onChange([e?.valueOf() || value[0], value[1]])}
            showTime
          />
          <DatePicker
            placeholder="End Date"
            value={moment(value[1])}
            onChange={(e) => onChange([value[0], e?.valueOf() || value[1]])}
            showTime
          />
        </Space>
      </Col>
    </Row>
  )
}

export default DurationInput