import { useMemo } from 'react'
import LazyLoad from '@senswap/react-lazyload'
import { useSelector } from 'react-redux'
import { useWallet } from '@senhub/providers'
import { account } from '@senswap/sen-js'
import { DaoData } from '@interdao/core'

import { Card, Col, Row, Space, Typography } from 'antd'
import DaoCard from './daoCard'
import DaoInitialization from '../daoInitialization'

import { AppState } from 'app/model'

const YourDaos = () => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const { dao } = useSelector((state: AppState) => state)

  const filteredDaos = useMemo(
    () =>
      Object.keys(dao).filter((daoAddr) => {
        const { authority } = dao[daoAddr] || ({} as DaoData)
        const authAddress = authority.toBase58()
        return account.isAddress(authAddress) && authAddress === walletAddress
      }),
    [dao, walletAddress],
  )

  if (!!filteredDaos.length)
    return (
      <Row gutter={[24, 24]}>
        {filteredDaos.map((daoAddress, idx) => (
          <Col span={24} key={daoAddress + idx}>
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
        <Card
          bordered={false}
          bodyStyle={{
            boxShadow: 'unset',
            paddingTop: 45,
            paddingBottom: 45,
            textAlign: 'center',
          }}
        >
          <Space direction="vertical" align="center">
            <Typography.Text type="secondary">Your DAO's empty</Typography.Text>
            <DaoInitialization />
          </Space>
        </Card>
      </Col>
    </Row>
  )
}

export default YourDaos
