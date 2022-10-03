import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useWidth } from '@sentre/senhub'
import { util } from '@sentre/senhub'

import {
  Avatar,
  Button,
  Card,
  Col,
  Image,
  Row,
  Space,
  Spin,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import StatisticCard from 'components/statisticCard'
import RegimeTag from 'components/regimeTag'
import { MintAvatar, MintSymbol } from '@sen-use/app'
import GradientAvatar from 'components/gradientAvatar'

import { AppState } from 'model'
import { useDaoMetaData } from 'hooks/dao/useDaoMetaData'
import useValidDaoMember from 'hooks/dao/useValidDaoMember'
import { getIcon, validURL } from 'helpers'

import autonomous from 'static/images/system/bg-autonomous.png'
import democratic from 'static/images/system/bg-democratic.png'
import dictatorial from 'static/images/system/bg-dictatorial.png'
import DaoMember from 'components/dao/daoMember'
import { APP_ROUTE } from 'configs/route'

export type DaoCardProps = { daoAddress: string }
export type DaoCardBackground = 'autonomous' | 'democratic' | 'dictatorial'
const DAO_CARD_BG = {
  autonomous,
  democratic,
  dictatorial,
}
const PAGE_PADDING = 24
const HEIGHT_RATIO = 1.777777
const MAX_WIDTH_RATE = 24 / 18 // full screen is 24 col, max width is 18 col

const DaoCard = ({ daoAddress }: DaoCardProps) => {
  const history = useHistory()
  const { regime, nonce, mint, isPublic } = useSelector(
    (state: AppState) => state.daos[daoAddress],
  )
  const width = useWidth()
  const metaData = useDaoMetaData(daoAddress)
  const { validMember } = useValidDaoMember(daoAddress)
  const parseRegime = Object.keys(regime)?.[0]

  const heightRatio = useMemo(() => {
    if (width < 768) return HEIGHT_RATIO
    if (width < 1200) return HEIGHT_RATIO * 2
    return HEIGHT_RATIO * 3
  }, [width])

  const handleClick = async () => {
    if (!metaData)
      return window.notify({
        type: 'warning',
        description: 'Data is loading',
      })
    if (!validMember && !isPublic)
      return window.notify({
        type: 'warning',
        description: 'You are not a member of this DAO',
      })

    history.push(APP_ROUTE.daoDetails.generatePath({ daoAddress }))
  }

  const isMobile = width < 768
  const desktopWidth = width > 992 ? width / MAX_WIDTH_RATE : width

  return (
    <Row gutter={[0, 0]} className="dao-card-wrapper" onClick={handleClick}>
      <Col
        span={24}
        className="dao-card-img"
        style={{
          height: !isMobile
            ? (desktopWidth - PAGE_PADDING * 2) / heightRatio
            : (width - PAGE_PADDING) / heightRatio,
        }}
      >
        <Image
          preview={false}
          src={DAO_CARD_BG[parseRegime as DaoCardBackground]}
        />
      </Col>
      <Col className="regime-tag-wrapper">
        <RegimeTag regime={regime} special />
      </Col>
      <Col span={24}>
        <Spin spinning={!metaData} tip="Loading...">
          <Card bordered={false}>
            <Row gutter={[20, 20]}>
              <Col span={24} style={{ minHeight: 88 }}>
                <Row gutter={[16, 16]} wrap={false} align="top">
                  <Col>
                    {!metaData?.image ? (
                      <GradientAvatar
                        seed={daoAddress}
                        avatarProps={{ shape: 'square', size: 68 }}
                      />
                    ) : (
                      <Avatar shape="square" size={68} src={metaData?.image} />
                    )}
                  </Col>
                  <Col flex="auto">
                    <Space direction="vertical" size={0}>
                      <Tooltip
                        title={
                          metaData?.daoName ? metaData.daoName : daoAddress
                        }
                      >
                        <Typography.Title
                          style={{ marginTop: -6 }}
                          level={4}
                          ellipsis={{ rows: 2 }}
                        >
                          {metaData?.daoName
                            ? metaData.daoName
                            : util.shortenAddress(daoAddress)}
                        </Typography.Title>
                      </Tooltip>
                      <Tag className="dao-tag" style={{ margin: 0 }}>
                        {isPublic ? 'Public' : 'Member Only'}
                      </Tag>
                      <Space size={2} style={{ marginLeft: -3 }}>
                        {metaData?.optionals?.map(
                          (url, idx) =>
                            validURL(url) && (
                              <Button
                                size="small"
                                type="text"
                                onClick={() => window.open(url, '_blank')}
                                icon={<IonIcon name={getIcon(url)} />}
                                key={idx}
                              />
                            ),
                        )}
                      </Space>
                    </Space>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <StatisticCard
                      title="Vote By"
                      value={
                        <Space>
                          <MintAvatar mintAddress={mint.toBase58()} />
                          <MintSymbol mintAddress={mint.toBase58()} />
                        </Space>
                      }
                    />
                  </Col>
                  <Col span={8}>
                    <StatisticCard
                      title="Proposals"
                      value={util.numeric(Number(nonce)).format('0,0')}
                    />
                  </Col>
                  <Col span={8}>
                    <StatisticCard
                      title="Members"
                      value={<DaoMember daoAddress={daoAddress} />}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={24} style={{ minHeight: 44 }}>
                <Typography.Paragraph
                  style={{ margin: 0 }}
                  type="secondary"
                  ellipsis={{ rows: 2 }}
                >
                  {metaData?.description}
                </Typography.Paragraph>
              </Col>
            </Row>
          </Card>
        </Spin>
      </Col>
    </Row>
  )
}

export default DaoCard
