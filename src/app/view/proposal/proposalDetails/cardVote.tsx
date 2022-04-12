import { Button, Card, Col, Row, Typography, Input } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { ProposalChildCardProps } from './index'

const CardVote = ({ proposalAddress, daoAddress }: ProposalChildCardProps) => {
  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5}>Cast your vote</Typography.Title>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            icon={<IonIcon name="thumbs-up-outline" />}
            block
          >
            Yes
          </Button>
        </Col>
        <Col span={12}>
          <Button icon={<IonIcon name="thumbs-down-outline" />} block>
            No
          </Button>
        </Col>
        <Col span={24}>
          <Card
            style={{ boxShadow: 'unset', borderRadius: 8 }}
            bodyStyle={{ padding: 8 }}
          >
            <Row gutter={[8, 8]}>
              <Col flex="auto">
                <Typography.Text>Amount vote</Typography.Text>
              </Col>
              <Col>
                <Typography.Text>Available: {0}</Typography.Text>
              </Col>
              <Col span={24}>
                <Input
                  bordered={false}
                  style={{ padding: 0 }}
                  placeholder="0"
                  suffix={
                    <Button size="small" type="text">
                      Max
                    </Button>
                  }
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Button type="primary" disabled block>
            Vote
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default CardVote
