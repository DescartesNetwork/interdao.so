import IonIcon from '@sentre/antd-ionicon'
import { util } from '@sentre/senhub'

import { Avatar, Button, Card, Col, Row, Space, Tag, Typography } from 'antd'

type CardCommentProps = { walletAddress: string }
const CardComment = ({ walletAddress }: CardCommentProps) => {
  return (
    <Card
      style={{
        borderWidth: '0 0 1px 0',
        borderRadius: 0,
        background: 'transparent',
      }}
      bodyStyle={{
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col>
              <Avatar size={48}>{walletAddress.substring(0, 2)}</Avatar>
            </Col>
            <Col flex="auto">
              <Space direction="vertical">
                <Space>
                  <Typography.Text>
                    {util.shortenAddress(walletAddress)}
                  </Typography.Text>
                  <Button
                    type="text"
                    icon={<IonIcon name="open-outline" />}
                    onClick={() => {}}
                  />
                </Space>
                <Space>
                  <Tag>Voted for</Tag>
                  <Typography.Text type="secondary">Just now</Typography.Text>
                </Space>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default CardComment
