import { DaoRegime, DaoRegimes } from '@interdao/core'
import isEqual from 'react-fast-compare'

import { Button, Row, Col, Space, Typography } from 'antd'

export type DaoRegimeInputProps = {
  value: DaoRegime
  onChange: (value: DaoRegime) => void
}

const DaoRegimeInput = ({
  value = DaoRegimes.Dictatorial,
  onChange = () => {},
}: DaoRegimeInputProps) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text>DAO Regime</Typography.Text>
      </Col>
      <Col span={24}>
        <Space>
          <Button
            type={
              isEqual(value, DaoRegimes.Dictatorial) ? 'primary' : 'default'
            }
            onClick={() => onChange(DaoRegimes.Dictatorial)}
            ghost
          >
            Dictatorial
          </Button>
          <Button
            type={isEqual(value, DaoRegimes.Democratic) ? 'primary' : 'default'}
            onClick={() => onChange(DaoRegimes.Democratic)}
            ghost
          >
            Democratic
          </Button>
          <Button
            type={isEqual(value, DaoRegimes.Autonomous) ? 'primary' : 'default'}
            onClick={() => onChange(DaoRegimes.Autonomous)}
            ghost
          >
            Autonomous
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default DaoRegimeInput
