import { useParams } from 'react-router-dom'

import { Col, Row, Space, Typography } from 'antd'
import { shortenAddress } from 'shared/util'

const Proposal = () => {
  const { daoAddress } = useParams<{ daoAddress: string }>()

  return (
    <Row gutter={[24, 24]} align="middle">
      <Col flex="auto">
        <Space>
          <Typography.Title level={3} type="secondary">
            DAO:
          </Typography.Title>
          <Typography.Title level={3}>
            {shortenAddress(daoAddress)}
          </Typography.Title>
        </Space>
      </Col>
      <Col>{/* <DaoInitialization /> */}</Col>
      <Col span={24}>{/* <DaoList /> */}</Col>
    </Row>
  )
}

export default Proposal
