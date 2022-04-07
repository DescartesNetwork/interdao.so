import { useUI } from '@senhub/providers'
import { Avatar, Card, Col, Row, Space, Typography } from 'antd'

import imgAvt from 'app/static/images/system/avatar.svg'
import IonIcon from 'shared/antd/ionicon'

type CardDAOSize = 'medium' | 'small' | undefined
type CardDAOProps = {
  size?: CardDAOSize
  daoAddress: string
}

const DefaultCard = ({ daoAddress }: { daoAddress: string }) => {
  return (
    <Card bordered={false} bodyStyle={{ boxShadow: 'unset' }}>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Space>
            <Avatar src={imgAvt} size={49} />
            <Space size={3} direction="vertical">
              <Space size={16}>
                <Typography.Title level={3}>Poor DAO</Typography.Title>
                <IonIcon name="checkmark-circle" />
                <IonIcon name="person" />
              </Space>
              <Space>
                <Typography.Text className="caption">
                  Member (9)
                </Typography.Text>
                <Typography.Text className="caption">
                  Proposals (4)
                </Typography.Text>
                <Typography.Text className="caption gradient-text">
                  32,026.629 veACM
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
      </Row>
    </Card>
  )
}

const MediumCard = ({ daoAddress }: { daoAddress: string }) => {
  const {
    ui: { infix },
  } = useUI()

  const direction = infix === 'xs' ? 'vertical' : 'horizontal'
  const size = infix === 'xs' ? 0 : 8

  return (
    <Card
      bordered={false}
      bodyStyle={{
        boxShadow: 'unset',
        paddingTop: 45,
        paddingBottom: 45,
        textAlign: 'center',
      }}
    >
      <Space size={10} direction="vertical">
        <Space>
          <Avatar src={imgAvt} size={32} />
          <Typography.Title level={3}>PoorDAO</Typography.Title>
        </Space>
        <Space direction={direction} size={size}>
          <Typography.Text className="caption">Member (9)</Typography.Text>
          <Typography.Text className="caption">Proposals (4)</Typography.Text>
        </Space>
      </Space>
    </Card>
  )
}

const SmallCard = ({ daoAddress }: { daoAddress: string }) => {
  return (
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
        <Avatar src={imgAvt} size={32} />
        <Typography.Title level={3}>Poor DAO</Typography.Title>
      </Space>
    </Card>
  )
}

const CardDAO = ({ size, daoAddress }: CardDAOProps) => {
  if (size === 'small') return <SmallCard daoAddress={daoAddress} />
  if (size === 'medium') return <MediumCard daoAddress={daoAddress} />
  return <DefaultCard daoAddress={daoAddress} />
}
export default CardDAO
