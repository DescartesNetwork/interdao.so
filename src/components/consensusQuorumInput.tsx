import { ConsensusQuorum, ConsensusQuorums } from '@interdao/core'
import isEqual from 'react-fast-compare'
import { Infix, useInfix } from '@sentre/senhub'

import { Button, Row, Col, Typography } from 'antd'

export type ConsensusQuorumInputProps = {
  value: ConsensusQuorum
  onChange: (value: ConsensusQuorum) => void
}

const ConsensusQuorumInput = ({
  value = ConsensusQuorums.Half,
  onChange = () => {},
}: ConsensusQuorumInputProps) => {
  const infix = useInfix()
  const mobileScreen = infix === Infix.xs
  const mobileSpan = mobileScreen ? 8 : undefined

  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Typography.Text>Consensus Quorum</Typography.Text>
      </Col>
      <Col span={mobileSpan}>
        <Button
          className={
            isEqual(value, ConsensusQuorums.OneThird) ? '' : 'btn-unselect'
          }
          onClick={() => onChange(ConsensusQuorums.OneThird)}
          block
        >
          1/3
        </Button>
      </Col>
      <Col span={mobileSpan}>
        <Button
          className={
            isEqual(value, ConsensusQuorums.Half) ? '' : 'btn-unselect'
          }
          onClick={() => onChange(ConsensusQuorums.Half)}
          block
        >
          1/2
        </Button>
      </Col>
      <Col span={mobileSpan}>
        <Button
          className={
            isEqual(value, ConsensusQuorums.TwoThird) ? '' : 'btn-unselect'
          }
          onClick={() => onChange(ConsensusQuorums.TwoThird)}
          block
        >
          2/3
        </Button>
      </Col>
    </Row>
  )
}

export default ConsensusQuorumInput
