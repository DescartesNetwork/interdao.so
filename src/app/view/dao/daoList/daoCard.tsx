import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { DaoData } from '@interdao/core'
import { useUI } from '@senhub/providers'

import {
  Avatar,
  Button,
  Card,
  Col,
  Image,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd'
import IonIcon from 'shared/antd/ionicon'
import StatisticCard from 'app/components/statisticCard'
import RegimeTag from 'app/components/regimeTag'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import GradientAvatar from 'app/components/gradientAvatar'

import { AppState } from 'app/model'
import { numeric, shortenAddress } from 'shared/util'
import useMembers from 'app/hooks/useMembers'
import useMetaData from 'app/hooks/useMetaData'

import autonomous from 'app/static/images/system/bg-autonomous.png'
import democratic from 'app/static/images/system/bg-democratic.png'
import dictatorial from 'app/static/images/system/bg-dictatorial.png'
import { SOCIAL_MEDIA } from 'app/model/metadata.controller'

export type DaoCardProps = { daoAddress: string; special?: boolean }
export type DaoCardBackground = 'autonomous' | 'democratic' | 'dictatorial'
const DAO_CARD_BG = {
  autonomous,
  democratic,
  dictatorial,
}
const PAGE_PADDING = 24
const HEIGHT_RATIO = 1.777777
const MAX_WIDTH_RATE = 24 / 18 // full screen is 24 col, max width is 18 col

const DaoCard = ({ daoAddress, special }: DaoCardProps) => {
  const {
    dao: { daoData },
  } = useSelector((state: AppState) => state)
  const history = useHistory()
  const {
    ui: { width },
  } = useUI()

  const heightRatio = useMemo(() => {
    if (width < 768) return HEIGHT_RATIO
    if (width < 1200) return HEIGHT_RATIO * 2
    return HEIGHT_RATIO * 3
  }, [width])

  const { regime, nonce, mint } = daoData?.[daoAddress] || ({} as DaoData)
  const members = useMembers(daoAddress)
  const metaData = useMetaData(daoAddress)
  const parseRegime = Object.keys(regime)?.[0]
  const isMobile = width < 768
  const desktopWidth = width > 992 ? width / MAX_WIDTH_RATE : width

  return (
    <Row
      gutter={[0, 0]}
      className="dao-card-wrapper"
      onClick={() => history.push(`dao/${daoAddress}`)}
    >
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
                      title={metaData?.daoName ? metaData.daoName : daoAddress}
                    >
                      <Typography.Title
                        style={{ marginTop: -6 }}
                        level={4}
                        ellipsis={{ rows: 2 }}
                      >
                        {metaData?.daoName
                          ? metaData.daoName
                          : shortenAddress(daoAddress)}
                      </Typography.Title>
                    </Tooltip>
                    <Space size={2} style={{ marginLeft: -8 }}>
                      {metaData?.optionals.map(
                        (url, idx) =>
                          url && (
                            <Button
                              size="small"
                              type="text"
                              onClick={() => window.open(url, '_blank')}
                              icon={
                                <IonIcon name={`logo-${SOCIAL_MEDIA[idx]}`} />
                              }
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
                    title="Token"
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
                    value={numeric(Number(nonce)).format('0,0')}
                  />
                </Col>
                <Col span={8}>
                  <StatisticCard
                    title="Members"
                    value={numeric(members).format('0,0')}
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
      </Col>
    </Row>
  )
}

export default DaoCard
