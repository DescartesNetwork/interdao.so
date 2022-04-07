import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { DaoData } from '@interdao/core'

import { Avatar, Card, Col, Row, Space, Typography } from 'antd'
import MechanismTag from 'app/components/mechanismTag'

import { AppDispatch, AppState } from 'app/model'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { shortenAddress } from 'shared/util'

import imgAvt from 'app/static/images/system/avatar.svg'
import IonIcon from 'shared/antd/ionicon'
import { useWallet } from '@senhub/providers'
import { account } from '@senswap/sen-js'
import { useEffect } from 'react'
import { getMember, Metadata } from 'app/model/metadata.controller'

export type DaoCardProps = { daoAddress: string }

const DaoCard = ({ daoAddress }: DaoCardProps) => {
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const { dao, metadata } = useSelector((state: AppState) => state)
  const history = useHistory()
  const dispatch = useDispatch<AppDispatch>()

  const { mechanism, supply, mint, nonce, authority } =
    dao[daoAddress] || ({} as DaoData)
  const { members } = metadata[daoAddress] || ({} as Metadata)
  const decimals = useMintDecimals(mint.toBase58()) || 0
  const circulatingSupply = supply.toNumber() / 10 ** decimals
  const authAddress = authority.toBase58()
  const isAuthor =
    account.isAddress(authAddress) && authAddress === walletAddress

  useEffect(() => {
    if (account.isAddress(daoAddress)) dispatch(getMember({ daoAddress }))
  }, [dispatch, daoAddress])

  return (
    <Card
      bordered={false}
      style={{ height: '100%' }}
      bodyStyle={{ boxShadow: 'unset', cursor: 'pointer' }}
      onClick={() => history.push(`dao/${daoAddress}`)}
    >
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Space>
            <Avatar src={imgAvt} size={49} />
            <Space size={3} direction="vertical">
              <Space size={16}>
                <Typography.Title level={3}>
                  {shortenAddress(daoAddress)}
                </Typography.Title>
                {isAuthor && <IonIcon name="person-outline" />}
              </Space>
              <Space>
                <Typography.Text className="caption">
                  Members ({members})
                </Typography.Text>
                <Typography.Text className="caption">
                  Proposals ({nonce.toNumber()})
                </Typography.Text>
                <Typography.Text className="caption gradient-text">
                  {circulatingSupply.toString()} veACM
                </Typography.Text>
              </Space>
            </Space>
          </Space>
        </Col>
        <Col span={24}>
          <Typography.Text>
            About: dOrg is helping to build the SafeSnap app, which enables
            cheap yet secure governance through on-chain execution of off-chain
            votes.
          </Typography.Text>
        </Col>
        <MechanismTag tag={Object.keys(mechanism)[0]} />
      </Row>
    </Card>
  )
}

export default DaoCard
