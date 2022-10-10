import { useHistory } from 'react-router-dom'
import { BN, web3 } from '@project-serum/anchor'
import { util, useWidth, useWalletAddress } from '@sentre/senhub'

import { Avatar, Button, Card, Col, Row, Space, Spin, Typography } from 'antd'
import { MintAvatar, MintSymbol } from '@sen-use/app'
import IonIcon from '@sentre/antd-ionicon'
import StatisticCard from 'components/ui/statisticCard'
import RegimeTag from 'components/regimeTag'
import GradientAvatar from 'components/gradientAvatar'
import AmountMembers from './members'

import { getIcon, validURL } from 'helpers'
import { useDaoMetaData } from 'hooks/dao/useDaoMetaData'
import { useDaoData } from 'hooks/dao'
import { APP_ROUTE } from 'configs/route'

const DaoInfo = ({ daoAddress }: { daoAddress: string }) => {
  const history = useHistory()
  const metaData = useDaoMetaData(daoAddress)
  const daoData = useDaoData(daoAddress)
  const width = useWidth()
  const walletAddress = useWalletAddress()

  const { regime, nonce, mint, authority } = daoData || {
    regime: {},
    nonce: new BN(0),
    mint: web3.SystemProgram.programId,
  }

  const onEditDAO = () =>
    history.push(APP_ROUTE.editDao.generatePath({ daoAddress }))

  const mobileScreen = width < 768

  return (
    <Card bordered={false} style={{ height: '100%' }}>
      <Spin spinning={!metaData} tip="Loading...">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Row justify="space-between" wrap={false}>
              <Col>
                <Row gutter={[16, 16]} wrap={false}>
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
                          : util.shortenAddress(daoAddress)}
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
                  onClick={onEditDAO}
                  disabled={authority && walletAddress !== authority.toBase58()}
                  style={{
                    marginRight: -10,
                    marginTop: -20,
                  }}
                  icon={<IonIcon name="settings-outline" />}
                >
                  Settings
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[36, 16]}>
              <Col xs={12} sm={6}>
                <StatisticCard
                  title="Proposals"
                  value={util.numeric(Number(nonce)).format('0,0')}
                />
              </Col>
              <Col xs={12} sm={6}>
                <AmountMembers daoAddress={daoAddress} />
              </Col>
              <Col xs={12} sm={6}>
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
      </Spin>
    </Card>
  )
}

export default DaoInfo
