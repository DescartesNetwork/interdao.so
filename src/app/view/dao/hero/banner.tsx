import { Card, Col, Row, Typography } from 'antd'

const Banner = () => {
  return (
    <Card className="glass" bordered={false} bodyStyle={{ padding: 48 }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title
            level={1}
            style={{ fontSize: 56, textAlign: 'center' }}
          >
            Let's build your own <span style={{ color: '#F9575E' }}>DAO</span>.
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Paragraph
            type="secondary"
            style={{ fontSize: 20, textAlign: 'center' }}
          >
            Customize the DAO to your purpose - No coding needed.
          </Typography.Paragraph>
        </Col>
      </Row>
    </Card>
  )
}

export default Banner
