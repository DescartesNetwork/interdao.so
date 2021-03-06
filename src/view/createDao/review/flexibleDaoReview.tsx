import { useSelector } from 'react-redux'
import { useUI } from '@sentre/senhub'
import { util } from '@sentre/senhub'

import { Col, Image, Row, Space, Typography } from 'antd'
import CardRegime from '../components/cardRegime'
import AvatarNFT from 'components/avatarNFT'

import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import { AppState } from 'model'

const MAX_WIDTH_RATIO = 24 / 16
const PAGE_SPACING = 24
const HEIGHT_RATIO = 1.777777

const FlexibleDaoReview = () => {
  const regime = useSelector((state: AppState) => state.createDao.data.regime)
  const isNft = useSelector((state: AppState) => state.createDao.data.isNft)
  const mintAddress = useSelector(
    (state: AppState) => state.createDao.data.mintAddress,
  )
  const supply = useSelector((state: AppState) => state.createDao.data.supply)
  const daoName = useSelector(
    (state: AppState) => state.createDao.data.metadata.daoName,
  )
  const description = useSelector(
    (state: AppState) => state.createDao.data.metadata.description,
  )
  const image = useSelector(
    (state: AppState) => state.createDao.data.metadata.image,
  )
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
      <Col xs={24} md={12}>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          <Space direction="vertical">
            <Typography.Text type="secondary">Name of DAO</Typography.Text>
            <Typography.Title level={1}>{daoName}</Typography.Title>
          </Space>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Text>DAO Regime</Typography.Text>
            <CardRegime regime={regime} />
          </Space>
        </Space>
      </Col>
      <Col xs={24} md={12}>
        <Space direction="vertical" size={24}>
          <Space direction="vertical">
            <Typography.Text type="secondary">Vote By</Typography.Text>
            {isNft ? (
              <AvatarNFT mintAddress={mintAddress} size={48} />
            ) : (
              <Space>
                <MintAvatar mintAddress={mintAddress} size={48} />
                <Typography.Title level={1}>
                  <MintSymbol mintAddress={mintAddress} />
                </Typography.Title>
              </Space>
            )}
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
          <Typography.Text type="secondary">Total Power</Typography.Text>
          <Space direction="horizontal">
            <Typography.Title level={1}>
              {util.numeric(supply?.toString()).format('0,0.[00]')}
            </Typography.Title>
            <Typography.Title level={1}>
              <MintSymbol mintAddress={mintAddress} />
            </Typography.Title>
          </Space>
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

export default FlexibleDaoReview
