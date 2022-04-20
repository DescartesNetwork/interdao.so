import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { DaoData } from '@interdao/core'

import { Avatar, Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import StatisticCard from 'app/components/statisticCard'
import RegimeTag from 'app/components/regimeTag'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import GradientAvatar from 'app/components/gradientAvatar'

import { AppState } from 'app/model'
import { numeric, shortenAddress } from 'shared/util'
import useMembers from 'app/hooks/useMembers'
import useMetaData from 'app/hooks/useMetaData'

export type DaoCardProps = { daoAddress: string }

const DaoCard = ({ daoAddress }: DaoCardProps) => {
  const { dao } = useSelector((state: AppState) => state)
  const history = useHistory()

  const { regime, nonce, mint } = dao[daoAddress] || ({} as DaoData)
  const members = useMembers(daoAddress)
  const metaData = useMetaData(daoAddress)

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
              {!metaData?.image ? (
                <GradientAvatar
                  seed={daoAddress}
                  avatarProps={{ shape: 'square', size: 56 }}
                />
              ) : (
                <Avatar shape="square" size={56} src={metaData?.image} />
              )}
            </Col>
            <Col flex="auto">
              <Space direction="vertical" size={0}>
                <Typography.Title level={4}>
                  {metaData?.daoName
                    ? metaData.daoName
                    : shortenAddress(daoAddress)}
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
            {metaData?.description}
          </Typography.Paragraph>
        </Col>
      </Row>
    </Card>
  )
}

export default DaoCard
