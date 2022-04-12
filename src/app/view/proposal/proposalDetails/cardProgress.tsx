import { Card, Col, Row, Space, Typography, Progress } from 'antd'

import { ProposalChildCardProps } from './index'

const CardProgress = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5}>Current results</Typography.Title>
        </Col>
        <Col span={24}>
          <Space size={0} style={{ width: '100%' }} direction="vertical">
            <Typography.Text type="secondary">Quorum</Typography.Text>
            <Typography.Text>989 more Yes votes required</Typography.Text>
            <Progress
              percent={100}
              strokeColor="#d3d3d6"
              success={{ percent: 60, strokeColor: '#F9575E' }}
              showInfo={false}
            />
          </Space>
        </Col>
        <Col span={24}>
          <Space className="space-full-width">
            <Row gutter={[0, 0]}>
              <Col flex="auto">
                <Typography.Text type="secondary">Yes vote</Typography.Text>
              </Col>
              <Col>
                <Space>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    55,07%
                  </Typography.Text>
                  <Typography.Title level={5}>102,161,162</Typography.Title>
                </Space>
              </Col>
              <Col span={24}>
                <Progress
                  percent={100}
                  strokeColor="#d3d3d6"
                  success={{ percent: 60, strokeColor: '#F9575E' }}
                  showInfo={false}
                />
              </Col>
            </Row>
          </Space>
        </Col>
        <Col span={24}>
          <Space className="space-full-width">
            <Row gutter={[0, 0]}>
              <Col flex="auto">
                <Typography.Text type="secondary">No vote</Typography.Text>
              </Col>
              <Col>
                <Space>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    55,07%
                  </Typography.Text>
                  <Typography.Title level={5}>102,161,162</Typography.Title>
                </Space>
              </Col>
              <Col span={24}>
                <Progress
                  percent={100}
                  strokeColor="#d3d3d6"
                  success={{ percent: 60, strokeColor: '#F9575E' }}
                  showInfo={false}
                />
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default CardProgress
