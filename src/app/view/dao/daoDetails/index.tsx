import { useSelector } from 'react-redux'
import { DaoData } from '@interdao/core'

import { Row, Col, Card, Space, Avatar, Typography, Button } from 'antd'
import OwnerIcon from 'app/components/ownerIcon'
import MembersCount from 'app/components/membersCount'
import { DaoSupply, DaoSymbol } from 'app/components/daoSupply'

import { shortenAddress } from 'shared/util'
import { AppState } from 'app/model'
import imgAvt from 'app/static/images/system/avatar.svg'
import IonIcon from 'shared/antd/ionicon'

const DaoDetails = ({ daoAddress }: { daoAddress: string }) => {
  const { dao } = useSelector((state: AppState) => state)

  const { nonce } = dao[daoAddress] || ({} as DaoData)

  return (
    <Card bordered={false} style={{ borderRadius: 0 }}>
      <Row gutter={[24, 24]} justify="space-between">
        <Col>
          <Space align="start">
            <Avatar src={imgAvt} size={64} />
            <Space direction="vertical">
              <Space>
                <Typography.Title level={3}>
                  {shortenAddress(daoAddress)}
                </Typography.Title>
                <OwnerIcon daoAddress={daoAddress} />
                <MembersCount daoAddress={daoAddress} />
              </Space>
              <Space style={{ maxWidth: 600 }}>
                <Typography.Text>
                  About: dOrg is helping to build the SafeSnap app, which
                  enables cheap yet secure governance through on-chain execution
                  of off-chain votes.
                </Typography.Text>
              </Space>
              <Space className="total-dao" direction="vertical" size={0}>
                <Typography.Title level={2}>
                  <DaoSupply daoAddress={daoAddress} />
                </Typography.Title>
                <Typography.Text type="secondary">
                  <DaoSymbol daoAddress={daoAddress} />
                </Typography.Text>
              </Space>
            </Space>
          </Space>
        </Col>
        <Col>
          <Row gutter={[14, 14]}>
            <Col span={24}>
              <Card
                bordered={false}
                style={{
                  boxShadow: 'unset',
                  background: '#222222',
                  textAlign: 'center',
                }}
              >
                <Space size={24}>
                  <Avatar size={100}>
                    <Typography.Text style={{ fontSize: 30 }}>
                      {nonce?.toNumber()}
                    </Typography.Text>
                  </Avatar>
                  <Space direction="vertical">
                    <Typography.Text type="secondary">Voting</Typography.Text>
                    <Typography.Text type="secondary">Passed</Typography.Text>
                    <Typography.Text type="secondary">Failed</Typography.Text>
                  </Space>
                </Space>
              </Card>
            </Col>
            <Col span={24}>
              <Button
                icon={<IonIcon name="add-outline" />}
                type="primary"
                block
              >
                Create proposal
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default DaoDetails
