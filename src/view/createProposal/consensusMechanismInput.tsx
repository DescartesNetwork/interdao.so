import { ConsensusMechanism, ConsensusMechanisms } from '@interdao/core'
import isEqual from 'react-fast-compare'
import { Infix, useInfix } from '@sentre/senhub'

import { Button, Row, Col, Space, Typography, Popover } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

export type ConsensusMechanismInputProps = {
  value: ConsensusMechanism
  onChange: (value: ConsensusMechanism) => void
}

const ConsensusMechanismInput = ({
  value = ConsensusMechanisms.StakedTokenCounter,
  onChange = () => {},
}: ConsensusMechanismInputProps) => {
  const infix = useInfix()
  const mobileScreen = infix === Infix.xs
  const mobileSpan = mobileScreen ? 12 : undefined

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space>
          <Typography.Text>Voting Mechanism</Typography.Text>
          <Popover
            overlayStyle={{ maxWidth: 300 }}
            trigger="click"
            content={
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Typography.Title level={5}>
                    What are Voting Mechanisms?
                  </Typography.Title>
                </Col>
                <Col span={24}>
                  <Space direction="vertical">
                    <Typography.Text>
                      <strong>Stake (Token) to Vote:</strong> The power of a
                      vote is only counted based on the number of staked tokens.
                    </Typography.Text>
                    <Typography.Text>
                      <strong>Lock (Token) to Vote:</strong> The power of a vote
                      is the product of the number of staked tokens and the lock
                      time in seconds.
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
      <Col span={mobileSpan}>
        <Button
          className={
            isEqual(value, ConsensusMechanisms.StakedTokenCounter)
              ? ''
              : 'btn-unselect'
          }
          onClick={() => onChange(ConsensusMechanisms.StakedTokenCounter)}
          block
        >
          Stake to Vote
        </Button>
      </Col>
      <Col span={mobileSpan}>
        <Button
          className={
            isEqual(value, ConsensusMechanisms.LockedTokenCounter)
              ? ''
              : 'btn-unselect'
          }
          onClick={() => onChange(ConsensusMechanisms.LockedTokenCounter)}
          block
        >
          Lock to Vote
        </Button>
      </Col>
    </Row>
  )
}

export default ConsensusMechanismInput
