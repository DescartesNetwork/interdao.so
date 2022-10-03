import { Col, Row, Space, Typography } from 'antd'

import DaoMember from 'components/dao/daoMember'

const AmountMembers = ({ daoAddress }: { daoAddress: string }) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space align="baseline">
          <Typography.Text className="caption" type="secondary">
            Members
          </Typography.Text>
        </Space>
      </Col>
      <Col span={24}>
        <DaoMember daoAddress={daoAddress} />
      </Col>
    </Row>
  )
}
export default AmountMembers
