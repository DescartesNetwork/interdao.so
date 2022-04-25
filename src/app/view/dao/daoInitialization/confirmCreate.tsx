import { useSelector } from 'react-redux'

import { Col, Image, Row, Space, Typography } from 'antd'
import CardRegmie from './daoRule/cardRegmie'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import { AppState } from 'app/model'

const ConfirmCreate = () => {
  const {
    dao: { createDaoData },
    metadata: { createMetaData },
  } = useSelector((state: AppState) => state)

  const { regime, mintAddress, supply } = createDaoData
  const { daoName, description, image } = createMetaData

  return (
    <Row gutter={[24, 24]}>
      <Col span={12}>
        <Space direction="vertical" size={24}>
          <Space direction="vertical">
            <Typography.Text type="secondary">Name of DAO</Typography.Text>
            <Typography.Title level={1}>{daoName}</Typography.Title>
          </Space>
          <Space direction="vertical">
            <Typography.Text>DAO Regmie</Typography.Text>
            <CardRegmie regmie={regime} />
          </Space>
        </Space>
      </Col>
      <Col span={12}>
        <Space direction="vertical" size={24}>
          <Space direction="vertical">
            <Typography.Text type="secondary">Name of DAO</Typography.Text>
            <Space>
              <MintAvatar mintAddress={mintAddress} size={48} />
              <Typography.Title level={1}>
                <MintSymbol mintAddress={mintAddress} />
              </Typography.Title>
            </Space>
          </Space>
          <Space direction="vertical" className="dao-logo-img">
            <Typography.Text>DAO Logo</Typography.Text>
            <Image src={image?.toString()} preview={false} />
          </Space>
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical">
          <Typography.Text type="secondary">Total power</Typography.Text>
          <Typography.Title level={1}>{supply?.toNumber()}</Typography.Title>
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical">
          <Typography.Text type="secondary">Description</Typography.Text>
          <Typography.Text>{description}</Typography.Text>
        </Space>
      </Col>
    </Row>
  )
}

export default ConfirmCreate
