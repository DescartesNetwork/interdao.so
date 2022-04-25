import { ReactNode } from 'react'

import { Card, Col, Row, Space, Typography } from 'antd'

export type InfoCardProps = {
  icon?: ReactNode
  title?: string
  value?: string
}

const InfoCard = ({ icon, title, value }: InfoCardProps) => {
  return (
    <Card
      bordered={false}
      style={{
        background: 'transparent',
        borderLeft: '1px solid',
        borderRadius: 'unset',
      }}
      bodyStyle={{
        padding: '0 24px',
      }}
    >
      <Row gutter={[5, 5]}>
        <Col span={24}>
          <Space>
            {icon}
            <Typography.Text type="secondary">{title}</Typography.Text>
          </Space>
        </Col>
        <Col span={24}>
          <Typography.Title level={4}>{value}</Typography.Title>
        </Col>
      </Row>
    </Card>
  )
}

export default InfoCard
