import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { SystemProgram } from '@solana/web3.js'
import BN from 'bn.js'
import { useUI, useWallet } from '@senhub/providers'

import { Avatar, Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import StatisticCard from 'app/components/statisticCard'
import RegimeTag from 'app/components/regimeTag'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import GradientAvatar from 'app/components/gradientAvatar'
import AmountMembers from './members'

import { AppState } from 'app/model'
import { numeric, shortenAddress } from 'shared/util'
import useMetaData from 'app/hooks/useMetaData'
import { getIcon, validURL } from 'app/helpers'
import configs from 'app/configs'
import { DaoDetailsProps } from './index'

const {
  manifest: { appId },
} = configs

const DaoInfo = ({ daoAddress }: DaoDetailsProps) => {
  const daos = useSelector((state: AppState) => state.daos.daos)
  const {
    ui: { width },
  } = useUI()
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const { metaData } = useMetaData(daoAddress)
  const history = useHistory()

  const { regime, nonce, mint, authority, isNft } = daos?.[daoAddress] || {
    regime: {},
    nonce: new BN(0),
    mint: SystemProgram.programId,
  }

  const editDAO = () => history.push(`/app/${appId}/dao/${daoAddress}/edit`)

  const mobileScreen = width < 768

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row>
            <Col flex="auto">
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
                    <Space size={0} style={{ marginLeft: -3 }}>
                      {(metaData?.optionals || []).map(
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
            <Col>
              <Button
                type="text"
                size="large"
                onClick={editDAO}
                disabled={authority && walletAddress !== authority.toBase58()}
                style={{
                  marginRight: -10,
                  marginTop: -20,
                }}
                icon={<IonIcon name="open-outline" />}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[36, 16]}>
            <Col xs={12} sm={6}>
              <StatisticCard
                title="Proposals"
                value={numeric(Number(nonce)).format('0,0')}
              />
            </Col>
            <Col xs={12} sm={6}>
              <AmountMembers daoAddress={daoAddress} />
            </Col>
            <Col xs={12} sm={6}>
              <StatisticCard
                title="Vote by"
                value={
                  isNft ? (
                    'NFT'
                  ) : (
                    <Space>
                      <MintAvatar mintAddress={mint.toBase58()} />
                      <MintSymbol mintAddress={mint.toBase58()} />
                    </Space>
                  )
                }
              />
            </Col>
            <Col xs={12} sm={6}>
              <StatisticCard
                title="Regime"
                value={<RegimeTag regime={regime} />}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24} className="scrollbar" style={{ height: 66 }}>
          <Typography.Paragraph
            type="secondary"
            ellipsis={{ rows: 3, expandable: true, symbol: 'View more' }}
            style={{ margin: 0 }}
          >
            {metaData?.description}
          </Typography.Paragraph>
        </Col>
      </Row>
    </Card>
  )
}

export default DaoInfo
