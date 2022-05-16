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
  const { image } = createMetaData

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
              value={<Typography.Title level={1}>Zeta</Typography.Title>}
            />
          </Col>
          <Col>
            <RowSpaceVertical
              label="Consensus Quorum"
              value={<Typography.Title level={1}>2/3</Typography.Title>}
            />
          </Col>
          <Col>
            <RowSpaceVertical
              label="DAO privacy"
              value={<Typography.Title level={1}>Member</Typography.Title>}
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
            <Typography.Text type="secondary">3 members</Typography.Text>
          </Col>
          {[1, 2, 3].map((item) => (
            <Col span={24} key={item}>
              <Space>
                <Typography.Title level={4}>KiO</Typography.Title>
                <Typography.Title level={4} type="secondary">
                  (6JsMB6PRrgvb847ZDkPMkJaiab826GhyKfCkQxhWzVTd)
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
              Lorem ipsum, sem, vulputate fusce magna non mattis, diam auctor,
              commodo risus.Lorem ipsum, sem, vulputate fusce magna non mattis,
              diam auctor, commodo risus.
            </Typography.Paragraph>
          }
        />
      </Col>
    </Row>
  )
}

export default ReviewAndCreate
