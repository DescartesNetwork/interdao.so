import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { DaoData } from '@interdao/core'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
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
  const history = useHistory()

  const { regime, nonce, mint } = dao[daoAddress] || ({} as DaoData)
  const members = useMembers(daoAddress)

  return (
    <Card
      bordered={false}
      onClick={() => history.push(`dao/${daoAddress}`)}
      hoverable
    >
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Row gutter={[16, 16]} wrap={false}>
            <Col>
              <GradientAvatar
                seed={daoAddress}
                avatarProps={{ shape: 'square', size: 56 }}
              />
            </Col>
            <Col flex="auto">
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
              <RegimeTag regime={regime} />
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
        <Col span={24}>
          <Typography.Paragraph type="secondary" ellipsis={{ rows: 3 }}>
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
