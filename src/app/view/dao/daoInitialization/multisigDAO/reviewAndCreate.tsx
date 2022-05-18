import { useSelector } from 'react-redux'

import { Col, Image, Row, Space, Typography } from 'antd'
import RowSpaceVertical from 'app/components/rowSpaceVertical'
import CardRegime from '../components/cardRegime'

import { AppState } from 'app/model'
import { useUI } from '@senhub/providers'

const PAGE_SPACING = 24
const HEIGHT_RATIO = 1.777777
const MAX_WIDTH_RATIO = 24 / 16

const ReviewAndCreate = () => {
  const {
    dao: { createDaoData },
    metadata: { createMetaData },
  } = useSelector((state: AppState) => state)
  const { regime } = createDaoData
  const { image, description, daoName, members, quorum } = createMetaData
  const parseQuorum = Object.keys(quorum)[0] || ''

  const {
    ui: { width },
  } = useUI()

  const isMobile = width < 768
  const desktopWidth = width > 992 ? width / MAX_WIDTH_RATIO : width
  const logoSize = isMobile
    ? '100%'
    : (desktopWidth - 6 - PAGE_SPACING * 4) / HEIGHT_RATIO / 2 + 3

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row justify="space-between">
          <Col>
            <RowSpaceVertical
              label="Name of DAO"
              value={<Typography.Title level={1}>{daoName}</Typography.Title>}
            />
          </Col>
          <Col>
            <RowSpaceVertical
              label="Consensus Quorum"
              value={
                <Typography.Title level={1}>{parseQuorum}</Typography.Title>
              }
            />
          </Col>
          <Col>
            <RowSpaceVertical
              label="DAO privacy"
              value={<Typography.Title level={1}>Public</Typography.Title>}
            />
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={12}>
        <RowSpaceVertical
          label="DAO Regime"
          value={<CardRegime regime={regime} />}
        />
      </Col>
      <Col xs={24} md={12}>
        <RowSpaceVertical
          label="DAO Regime"
          value={
            <Image
              style={{ width: logoSize, height: logoSize }}
              src={image?.toString()}
              preview={false}
            />
          }
        />
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Typography.Text type="secondary">
              {members.length} members
            </Typography.Text>
          </Col>
          {members.map(({ walletAddress, name }) => (
            <Col span={24} key={walletAddress}>
              <Space>
                <Typography.Title level={4}>{name}</Typography.Title>
                <Typography.Title level={4} type="secondary">
                  {walletAddress}
                </Typography.Title>
              </Space>
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={24}>
        <RowSpaceVertical
          label="Description"
          value={
            <Typography.Paragraph style={{ margin: 0 }}>
              {description}
            </Typography.Paragraph>
          }
        />
      </Col>
    </Row>
  )
}

export default ReviewAndCreate
