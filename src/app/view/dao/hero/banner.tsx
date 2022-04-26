import { Col, Row, Space, Typography } from 'antd'

const Banner = () => {
  return (
    <Row gutter={[16, 16]} justify="center">
      <Col>
        <Space direction="vertical" size={0}>
          <Typography.Title
            level={1}
            style={{ fontSize: 56, textAlign: 'center' }}
          >
            Let's build
          </Typography.Title>
          <Typography.Title
            level={1}
            style={{ fontSize: 56, textAlign: 'center' }}
            className="spec-title"
          >
            Your own DAO.
          </Typography.Title>
        </Space>
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
  )
}

export default Banner
