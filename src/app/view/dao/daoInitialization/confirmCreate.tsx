import { useSelector } from 'react-redux'
import { useUI } from '@senhub/providers'

import { Col, Image, Row, Space, Typography } from 'antd'
import CardRegmie from './daoRule/cardRegmie'

import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import { AppState } from 'app/model'
import { numeric } from 'shared/util'

const MAX_WIDTH_RATIO = 24 / 16
const PAGE_SPACING = 24
const HEIGHT_RATIO = 1.777777

const ConfirmCreate = () => {
  const {
    dao: { createDaoData },
    metadata: { createMetaData },
  } = useSelector((state: AppState) => state)
  const {
    ui: { width },
  } = useUI()

  const { regime, mintAddress, supply } = createDaoData
  const { daoName, description, image } = createMetaData
  const isMobile = width < 768
  const desktopWidth = width > 992 ? width / MAX_WIDTH_RATIO : width
  const logoSize = isMobile
    ? '100%'
    : (desktopWidth - 6 - PAGE_SPACING * 4) / HEIGHT_RATIO / 2 + 3

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={12}>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          <Space direction="vertical">
            <Typography.Text type="secondary">Name of DAO</Typography.Text>
            <Typography.Title level={1}>{daoName}</Typography.Title>
          </Space>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Text>DAO Regmie</Typography.Text>
            <CardRegmie regmie={regime} />
          </Space>
        </Space>
      </Col>
      <Col xs={24} md={12}>
        <Space direction="vertical" size={24}>
          <Space direction="vertical">
            <Typography.Text type="secondary">Token to vote</Typography.Text>
            <Space>
              <MintAvatar mintAddress={mintAddress} size={48} />
              <Typography.Title level={1}>
                <MintSymbol mintAddress={mintAddress} />
              </Typography.Title>
            </Space>
          </Space>
          <Space direction="vertical" className="dao-logo-img">
            <Typography.Text>DAO Logo</Typography.Text>
            <Image
              style={{ width: logoSize, height: logoSize }}
              src={image?.toString()}
              preview={false}
            />
          </Space>
        </Space>
      </Col>
      <Col span={24}>
        <Space direction="vertical">
          <Typography.Text type="secondary">Total power</Typography.Text>
          <Typography.Title level={1}>
            {numeric(supply?.toNumber()).format('0,0.[00]')}
          </Typography.Title>
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
