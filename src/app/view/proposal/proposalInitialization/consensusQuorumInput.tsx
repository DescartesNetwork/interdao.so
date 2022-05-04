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
            className={
              isEqual(value, ConsensusQuorums.OneThird) ? '' : 'btn-unselect'
            }
            onClick={() => onChange(ConsensusQuorums.OneThird)}
          >
            1/3
          </Button>
          <Button
            className={
              isEqual(value, ConsensusQuorums.Half) ? '' : 'btn-unselect'
            }
            onClick={() => onChange(ConsensusQuorums.Half)}
          >
            1/2
          </Button>
          <Button
            className={
              isEqual(value, ConsensusQuorums.TwoThird) ? '' : 'btn-unselect'
            }
            onClick={() => onChange(ConsensusQuorums.TwoThird)}
          >
            2/3
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default ConsensusQuorumInput
