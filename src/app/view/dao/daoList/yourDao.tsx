import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LazyLoad from '@senswap/react-lazyload'
import { useWallet } from '@senhub/providers'
import { account } from '@senswap/sen-js'
import { DaoData } from '@interdao/core'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import DaoCard from './daoCard'

import { AppState } from 'app/model'
import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

const YourDaos = () => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const {
    dao: { daoData },
  } = useSelector((state: AppState) => state)
  const history = useHistory()

  const filteredDaos = useMemo(
    () =>
      Object.keys(daoData).filter((daoAddr) => {
        const { authority } = daoData[daoAddr] || ({} as DaoData)
        const authAddress = authority.toBase58()
        return account.isAddress(authAddress) && authAddress === walletAddress
      }),
    [daoData, walletAddress],
  )

  if (!!filteredDaos.length)
    return (
      <Row gutter={[24, 24]}>
        {filteredDaos.map((daoAddress) => (
          <Col xs={24} md={12} xl={8} key={daoAddress}>
            <LazyLoad height={191.5}>
              <DaoCard daoAddress={daoAddress} />
            </LazyLoad>
          </Col>
        ))}
      </Row>
    )

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Card bordered={false} bodyStyle={{ padding: 45, textAlign: 'center' }}>
          <Space direction="vertical" align="center">
            <Typography.Text type="secondary">
              You have no DAO yet!
            </Typography.Text>
            <Button onClick={() => history.push(`/app/${appId}/dao/new-dao`)}>
              Build your DAO
            </Button>
          </Space>
        </Card>
      </Col>
    </Row>
  )
}

export default YourDaos
