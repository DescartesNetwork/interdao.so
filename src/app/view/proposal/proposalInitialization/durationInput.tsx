import moment from 'moment'

import { Col, DatePicker, Row, Typography } from 'antd'

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
        <Row gutter={[12, 12]}>
          <Col span={12}>
            <DatePicker
              placeholder="Start Date"
              value={moment(value[0])}
              onChange={(e) => onChange([e?.valueOf() || value[0], value[1]])}
              showTime
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={12}>
            <DatePicker
              placeholder="End Date"
              value={moment(value[1])}
              onChange={(e) => onChange([value[0], e?.valueOf() || value[1]])}
              showTime
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default DurationInput
