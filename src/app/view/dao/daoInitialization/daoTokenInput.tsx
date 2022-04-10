import { ChangeEvent } from 'react'

import { Button, Col, Input, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import IonIcon from 'shared/antd/ionicon'
import { explorer } from 'shared/util'

export type DaoTokenInputProps = {
  value: string
  onChange: (value: string) => void
}

const DaoTokenInput = ({ value, onChange }: DaoTokenInputProps) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text>Token to Vote</Typography.Text>
      </Col>
      <Col span={24}>
        <Input
          size="large"
          placeholder="Input Token Address"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value || '')
          }
          suffix={
            <Button
              type="text"
              icon={<IonIcon name="open-outline" />}
              onClick={() => window.open(explorer(value), '_blank')}
              style={{ marginRight: -7 }}
            >
              <Space style={{ marginLeft: 7 }}>
                <MintSymbol mintAddress={value} />
                <MintAvatar mintAddress={value} />
              </Space>
            </Button>
          }
        />
      </Col>
    </Row>
  )
}

export default DaoTokenInput
