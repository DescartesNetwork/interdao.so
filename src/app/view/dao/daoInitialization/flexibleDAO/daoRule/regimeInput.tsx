import { DaoRegime, DaoRegimes } from '@interdao/core'

import { Button, Row, Col, Space, Typography, Popover } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import CardRegime from '../../components/cardRegime'

export type RegimeInputProps = {
  value: DaoRegime
  onChange: (value: DaoRegime) => void
}

export const REGIME_LIST = [
  DaoRegimes.Dictatorial,
  DaoRegimes.Democratic,
  DaoRegimes.Autonomous,
]

const RegimeInput = ({
  value = DaoRegimes.Dictatorial,
  onChange = () => {},
}: RegimeInputProps) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space>
          <Typography.Text>DAO Regime</Typography.Text>
          <Popover
            overlayStyle={{ maxWidth: 300 }}
            trigger="click"
            content={
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Typography.Title level={5}>
                    What is DAO Regime?
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Space direction="vertical">
                    <Typography.Text>
                      <strong>Dictatorial.</strong> Only DAO owner can create
                      and execute proposals.
                    </Typography.Text>
                    <Typography.Text>
                      <strong>Democratic.</strong> Community can create
                      proposals, DAO owner execute proposals.
                    </Typography.Text>
                    <Typography.Text>
                      <strong>Autonomous.</strong> Community can create and
                      execute proposals.
                    </Typography.Text>
                  </Space>
                </Col>
              </Row>
            }
          >
            <Button
              type="text"
              size="small"
              icon={<IonIcon name="information-circle-outline" />}
            />
          </Popover>
        </Space>
      </Col>
      {REGIME_LIST.map((regime, idx) => (
        <Col xs={24} md={8} key={idx}>
          <CardRegime value={value} regime={regime} onChange={onChange} />
        </Col>
      ))}
    </Row>
  )
}

export default RegimeInput
