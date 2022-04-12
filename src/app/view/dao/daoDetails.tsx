import { useSelector } from 'react-redux'
import { SystemProgram } from '@solana/web3.js'
import BN from 'bn.js'

import { Button, Card, Col, Divider, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import StatisticCard from 'app/components/statisticCard'
import RegimeTag from 'app/components/regimeTag'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import GradientAvatar from 'app/components/gradientAvatar'

import { AppState } from 'app/model'
import { numeric, shortenAddress } from 'shared/util'
import useMembers from 'app/hooks/useMembers'

export type DaoCardProps = { daoAddress: string }

const DaoCard = ({ daoAddress }: DaoCardProps) => {
  const { dao } = useSelector((state: AppState) => state)

  const { regime, nonce, mint } = dao[daoAddress] || {
    regime: {},
    nonce: new BN(0),
    mint: SystemProgram.programId,
  }
  const members = useMembers(daoAddress)

  return (
    <Card bordered={false}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[16, 16]} wrap={false}>
            <Col>
              <GradientAvatar
                seed={daoAddress}
                avatarProps={{ shape: 'square', size: 56 }}
              />
            </Col>
            <Col>
              <Space direction="vertical" size={0}>
                <Typography.Title level={4}>
                  {shortenAddress(daoAddress)}
                </Typography.Title>
                <Space size={2} style={{ marginLeft: -8 }}>
                  <Button type="text" icon={<IonIcon name="logo-discord" />} />
                  <Button type="text" icon={<IonIcon name="logo-twitter" />} />
                  <Button type="text" icon={<IonIcon name="logo-telegram" />} />
                </Space>
              </Space>
            </Col>
            <Col>
              <Divider type="vertical" style={{ height: '100%' }} />
            </Col>
            <Col flex="auto">
              <Row gutter={[36, 36]} wrap={false}>
                <Col>
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
                <Col>
                  <StatisticCard
                    title="Proposals"
                    value={numeric(Number(nonce)).format('0,0')}
                  />
                </Col>
                <Col>
                  <StatisticCard
                    title="Members"
                    value={numeric(members).format('0,0')}
                  />
                </Col>
                <Col>
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
          <Typography.Paragraph type="secondary">
            About: dOrg is helping to build the SafeSnap app, which enables
            cheap yet secure governance through on-chain execution of off-chain
            votes. dOrg is helping to build the SafeSnap app, which enables
            cheap yet secure governance through on-chain execution of off-chain
            votes.
          </Typography.Paragraph>
        </Col>
      </Row>
    </Card>
  )
}

export default DaoCard