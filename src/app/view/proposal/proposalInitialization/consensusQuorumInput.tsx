import { ConsensusQuorum, ConsensusQuorums } from '@interdao/core'
import isEqual from 'react-fast-compare'

import { Button, Row, Col, Space, Typography } from 'antd'

export type ConsensusQuorumInputProps = {
  value: ConsensusQuorum
  onChange: (value: ConsensusQuorum) => void
}

const ConsensusQuorumInput = ({
  value = ConsensusQuorums.Half,
  onChange = () => {},
}: ConsensusQuorumInputProps) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text>Consensus Quorum</Typography.Text>
      </Col>
      <Col span={24}>
        <Space>
          <Button
            type={
              isEqual(value, ConsensusQuorums.OneThird) ? 'primary' : 'default'
            }
            onClick={() => onChange(ConsensusQuorums.OneThird)}
            ghost
          >
            1/3
          </Button>
          <Button
            type={isEqual(value, ConsensusQuorums.Half) ? 'primary' : 'default'}
            onClick={() => onChange(ConsensusQuorums.Half)}
            ghost
          >
            1/2
          </Button>
          <Button
            type={
              isEqual(value, ConsensusQuorums.TwoThird) ? 'primary' : 'default'
            }
            onClick={() => onChange(ConsensusQuorums.TwoThird)}
            ghost
          >
            2/3
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default ConsensusQuorumInput
