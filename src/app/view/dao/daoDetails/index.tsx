import { useSelector } from 'react-redux'
import { DaoData } from '@interdao/core'
import { useHistory } from 'react-router-dom'

import { Row, Col, Card, Space, Avatar, Typography, Button } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import OwnerIcon from 'app/components/ownerIcon'
import { DaoSupply, DaoSymbol } from 'app/components/daoSupply'

import { shortenAddress } from 'shared/util'
import { AppState } from 'app/model'
import AvatarImage from 'app/static/images/system/avatar.png'
import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

const LEGEND_VOTING = ['voting', 'passed', 'failed']

const DaoDetails = ({ daoAddress }: { daoAddress: string }) => {
  const { dao } = useSelector((state: AppState) => state)
  const history = useHistory()

  const { nonce } = dao[daoAddress] || ({} as DaoData)

  return (
    <Row gutter={[24, 24]} justify="space-between">
      <Col>
        <Space align="start">
          <Avatar src={AvatarImage} size={56} />
          <Space direction="vertical">
            <Space>
              <Typography.Title level={3}>
                {shortenAddress(daoAddress)}
              </Typography.Title>
              <OwnerIcon daoAddress={daoAddress} />
            </Space>
            <Space style={{ maxWidth: 600 }}>
              <Typography.Text>
                About: dOrg is helping to build the SafeSnap app, which enables
                cheap yet secure governance through on-chain execution of
                off-chain votes.
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
              }}
            >
              <Space
                style={{ width: '100%', justifyContent: 'space-between' }}
                size={24}
                align="center"
              >
                <Avatar size={100}>
                  <Typography.Text style={{ fontSize: 30 }}>
                    {nonce?.toNumber()}
                  </Typography.Text>
                </Avatar>
                <Space direction="vertical">
                  {LEGEND_VOTING.map((legend, i) => (
                    <Typography.Text
                      key={i}
                      className={`legend-status legend-${legend}`}
                    >
                      {legend}
                    </Typography.Text>
                  ))}
                </Space>
              </Space>
            </Card>
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              icon={<IonIcon name="add-outline" />}
              onClick={() =>
                history.push(`/app/${appId}/dao/${daoAddress}/new-proposal`)
              }
              block
            >
              New Proposal
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default DaoDetails
