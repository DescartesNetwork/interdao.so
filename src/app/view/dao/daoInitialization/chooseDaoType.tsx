import { Col, Row, Space, Typography } from 'antd'

type ChooseDaoTypeProps = {
  onSelected: (selected: string) => void
}

const ChooseDaoType = ({ onSelected }: ChooseDaoTypeProps) => {
  return (
    <Row gutter={[24, 32]} className="choose-dao-wrapper">
      <Col xs={24} md={12}>
        <div style={{ padding: 16 }} className="active">
          <Space direction="vertical">
            <Typography.Title level={4}>Flexible DAO</Typography.Title>
            <Typography.Text type="secondary">
              The Normal DAO has 3 regimes that allow you to create a DAO
              customized for your individual requirements, community structure,
              and governance token setup.
            </Typography.Text>
          </Space>
        </div>
      </Col>
    </Row>
  )
}

export default ChooseDaoType
