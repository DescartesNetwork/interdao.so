import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { DaoData } from '@interdao/core'

import { Avatar, Card, Col, Row, Space, Typography } from 'antd'
import MechanismTag from 'app/components/mechanismTag'
import OwnerIcon from 'app/components/ownerIcon'
import MembersCount from 'app/components/membersCount'

import { AppState } from 'app/model'
import { shortenAddress } from 'shared/util'

import imgAvt from 'app/static/images/system/avatar.svg'
import DaoSupply from 'app/components/daoSupply'

export type DaoCardProps = { daoAddress: string }

const DaoCard = ({ daoAddress }: DaoCardProps) => {
  const { dao } = useSelector((state: AppState) => state)
  const history = useHistory()

  const { mechanism, nonce } = dao[daoAddress] || ({} as DaoData)

  return (
    <Card
      bordered={false}
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
                <OwnerIcon daoAddress={daoAddress} />
              </Space>
              <Space>
                <Typography.Text className="caption">
                  <MembersCount daoAddress={daoAddress} />
                </Typography.Text>
                <Typography.Text className="caption">
                  Proposals ({nonce.toNumber()})
                </Typography.Text>
                <Typography.Text className="caption gradient-text">
                  <DaoSupply daoAddress={daoAddress} />
                </Typography.Text>
              </Space>
            </Space>
          </Space>
        </Col>
        <Col span={24}>
          <Typography.Text className="ellipsis-text">
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
