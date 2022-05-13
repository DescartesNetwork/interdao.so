import { useWallet } from '@senhub/providers'

import { Button, Col, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import MemberInput from './memberInput'

const DAOMembers = () => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title level={4}>
          People who'll be part of your team.
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Row gutter={[12, 12]}>
          <Col span={24} key={walletAddress}>
            <MemberInput
              name={''}
              walletAddress={walletAddress}
              onChange={() => {}}
              disabledBtn={true}
              disabledWalletInput={true}
            />
          </Col>

          <Col span={4}>
            <Button
              style={{ width: '100%' }}
              type="dashed"
              icon={<IonIcon name="add-outline" />}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default DAOMembers
