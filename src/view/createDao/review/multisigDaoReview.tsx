import { useSelector } from 'react-redux'
import { useWidth } from '@sentre/senhub'

import { Col, Image, Row, Space, Typography } from 'antd'
import RowSpaceVertical from 'components/rowSpaceVertical'
import CardRegime from '../components/cardRegime'

import { AppState } from 'model'

const PAGE_SPACING = 24
const HEIGHT_RATIO = 1.777777
const MAX_WIDTH_RATIO = 24 / 16

const MultisigDAOReview = () => {
  const regime = useSelector((state: AppState) => state.createDao.data.regime)
  const isPublic = useSelector(
    (state: AppState) => state.createDao.data.isPublic,
  )
  const daoName = useSelector(
    (state: AppState) => state.createDao.data.metadata.daoName,
  )
  const description = useSelector(
    (state: AppState) => state.createDao.data.metadata.description,
  )
  const image = useSelector(
    (state: AppState) => state.createDao.data.metadata.image,
  )
  const members = useSelector(
    (state: AppState) => state.createDao.data.metadata.members,
  )
  const width = useWidth()

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
              label="DAO Privacy"
              value={
                <Typography.Title level={1}>
                  {isPublic ? 'Public' : 'Member'}
                </Typography.Title>
              }
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

export default MultisigDAOReview
