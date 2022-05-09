import { useSelector } from 'react-redux'
import { SystemProgram } from '@solana/web3.js'
import BN from 'bn.js'

import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
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
import { SOCIAL_MEDIA } from 'app/model/metadata.controller'
import { useUI } from '@senhub/providers'

export type DaoDetailsProps = { daoAddress: string }

const DaoDetails = ({ daoAddress }: DaoDetailsProps) => {
  const {
    dao: { daoData },
  } = useSelector((state: AppState) => state)
  const {
    ui: { width },
  } = useUI()
  const { regime, nonce, mint } = daoData?.[daoAddress] || {
    regime: {},
    nonce: new BN(0),
    mint: SystemProgram.programId,
  }
  const members = useMembers(daoAddress)
  const metaData = useMetaData(daoAddress)
  const mobileScreen = width < 768

  return (
    <Card bordered={false}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col>
              {!metaData?.image ? (
                <GradientAvatar
                  seed={daoAddress}
                  avatarProps={{ shape: 'square', size: 56 }}
                />
              ) : (
                <Avatar shape="square" size={56} src={metaData?.image} />
              )}
            </Col>
            <Col flex={mobileScreen ? 'auto' : undefined}>
              <Space direction="vertical" size={0}>
                <Typography.Title level={4}>
                  {metaData?.daoName
                    ? metaData.daoName
                    : shortenAddress(daoAddress)}
                </Typography.Title>
                <Space size={0} style={{ marginLeft: -8 }}>
                  {metaData?.optionals.map((url, idx) => (
                    <Button
                      size="small"
                      type="text"
                      onClick={() => window.open(url, '_blank')}
                      icon={<IonIcon name={`logo-${SOCIAL_MEDIA[idx]}`} />}
                      key={idx}
                    />
                  ))}
                </Space>
              </Space>
            </Col>
            <Col style={mobileScreen ? { display: 'none' } : {}}>
              <Divider type="vertical" style={{ height: '100%' }} />
            </Col>
            <Col span={mobileScreen ? 24 : undefined} flex="auto">
              <Row gutter={[36, 36]}>
                <Col xs={12} sm={4}>
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
                <Col xs={12} sm={4}>
                  <StatisticCard
                    title="Proposals"
                    value={numeric(Number(nonce)).format('0,0')}
                  />
                </Col>
                <Col xs={12} sm={4}>
                  <StatisticCard
                    title="Members"
                    value={numeric(members).format('0,0')}
                  />
                </Col>
                <Col xs={12} sm={4}>
                  <StatisticCard
                    title="Regime"
                    value={<RegimeTag regime={regime} />}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Typography.Paragraph
            type="secondary"
            ellipsis={{ rows: 3, expandable: true, symbol: 'View more' }}
          >
            {metaData?.description}
          </Typography.Paragraph>
        </Col>
      </Row>
    </Card>
  )
}

export default DaoDetails
