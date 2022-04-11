import { useParams, useHistory } from 'react-router-dom'
import moment from 'moment'

import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Typography,
  Input,
  Progress,
} from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ProposalStatus from 'app/components/proposalStatus'

import useProposal from 'app/hooks/useProposal'
import { shortenAddress } from 'shared/util'

import configs from 'app/configs'
import { useSelector } from 'react-redux'
import { AppState } from 'app/model'
import { DaoData } from '@interdao/core'
import { MintSymbol } from 'shared/antd/mint'

const {
  manifest: { appId },
} = configs

type RowSpaceBetweenProps = {
  label?: string
  value?: string
}

type ProposalChildCardProps = {
  proposalAddress: string
  daoAddress: string
}

const RowSpaceBetween = ({ label = '', value = '' }: RowSpaceBetweenProps) => {
  return (
    <Row gutter={[24, 24]}>
      <Col flex="auto">{label}</Col>
      <Col>{value}</Col>
    </Row>
  )
}

const CardStatus = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  const { dao } = useSelector((state: AppState) => state)
  const { accountsLen } = useProposal(proposalAddress, daoAddress)

  const { mint } = dao[daoAddress] || ({} as DaoData)

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col flex="auto">
          <Space direction="vertical">
            <Space>
              <Typography.Title level={3}>
                Donate to <MintSymbol mintAddress={mint?.toBase58()} />
              </Typography.Title>
              <ProposalStatus status={'Voting'} />
            </Space>
            <Space>
              <IonIcon name="people-outline" />
              <Typography.Text>Member: {accountsLen}</Typography.Text>
            </Space>
          </Space>
        </Col>
        <Col>
          <Button size="large" type="primary" disabled>
            Excute
          </Button>
        </Col>
        <Col span={24}>
          <Typography.Text type="secondary">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type... View more
          </Typography.Text>
        </Col>
      </Row>
    </Card>
  )
}

const CardVote = ({ proposalAddress, daoAddress }: ProposalChildCardProps) => {
  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5}>Cast your vote</Typography.Title>
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            icon={<IonIcon name="thumbs-up-outline" />}
            block
          >
            Yes
          </Button>
        </Col>
        <Col span={12}>
          <Button icon={<IonIcon name="thumbs-down-outline" />} block>
            No
          </Button>
        </Col>
        <Col span={24}>
          <Card
            style={{ boxShadow: 'unset', borderRadius: 8 }}
            bodyStyle={{ padding: 8 }}
          >
            <Row gutter={[8, 8]}>
              <Col flex="auto">
                <Typography.Text>Amount vote</Typography.Text>
              </Col>
              <Col>
                <Typography.Text>Available: {0}</Typography.Text>
              </Col>
              <Col span={24}>
                <Input
                  bordered={false}
                  style={{ padding: 0 }}
                  placeholder="0"
                  suffix={
                    <Button size="small" type="text">
                      Max
                    </Button>
                  }
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Button type="primary" disabled block>
            Vote
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

const CardInfo = ({ proposalAddress, daoAddress }: ProposalChildCardProps) => {
  const { consensusQuorum, startDate, endDate, consensusMechanism } =
    useProposal(proposalAddress, daoAddress)

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5}>Infomation</Typography.Title>
        </Col>
        <Col span={24}>
          <Space style={{ width: '100%' }} direction="vertical">
            <RowSpaceBetween
              label="Proposal ID"
              value={shortenAddress(proposalAddress, 3)}
            />
            <RowSpaceBetween
              label="Start time"
              value={moment(startDate?.toNumber()).format('MMM DD,yyyy HH:mm')}
            />
            <RowSpaceBetween
              label="End time"
              value={moment(endDate?.toNumber()).format('MMM DD,yyyy HH:mm')}
            />
            <RowSpaceBetween label="Author" value={'1'} />
            <RowSpaceBetween
              label="Quorum"
              value={consensusQuorum ? Object.keys(consensusQuorum)[0] : '1/2'}
            />
            <RowSpaceBetween
              label="Vote method"
              value={
                consensusMechanism ? Object.keys(consensusMechanism)[0] : ''
              }
            />
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

const CardProgress = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5}>Current results</Typography.Title>
        </Col>
        <Col span={24}>
          <Space size={0} style={{ width: '100%' }} direction="vertical">
            <Typography.Text type="secondary">Quorum</Typography.Text>
            <Typography.Text>989 more Yes votes required</Typography.Text>
            <Progress
              percent={100}
              strokeColor="#d3d3d6"
              success={{ percent: 60, strokeColor: '#F9575E' }}
              showInfo={false}
            />
          </Space>
        </Col>
        <Col span={24}>
          <Space className="space-full-width">
            <Row gutter={[0, 0]}>
              <Col flex="auto">
                <Typography.Text type="secondary">Yes vote</Typography.Text>
              </Col>
              <Col>
                <Space>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    55,07%
                  </Typography.Text>
                  <Typography.Title level={5}>102,161,162</Typography.Title>
                </Space>
              </Col>
              <Col span={24}>
                <Progress
                  percent={100}
                  strokeColor="#d3d3d6"
                  success={{ percent: 60, strokeColor: '#F9575E' }}
                  showInfo={false}
                />
              </Col>
            </Row>
          </Space>
        </Col>
        <Col span={24}>
          <Space className="space-full-width">
            <Row gutter={[0, 0]}>
              <Col flex="auto">
                <Typography.Text type="secondary">No vote</Typography.Text>
              </Col>
              <Col>
                <Space>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    55,07%
                  </Typography.Text>
                  <Typography.Title level={5}>102,161,162</Typography.Title>
                </Space>
              </Col>
              <Col span={24}>
                <Progress
                  percent={100}
                  strokeColor="#d3d3d6"
                  success={{ percent: 60, strokeColor: '#F9575E' }}
                  showInfo={false}
                />
              </Col>
            </Row>
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

const ProposalDetails = () => {
  const history = useHistory()
  const { proposalAddress, daoAddress } =
    useParams<{ daoAddress: string; proposalAddress: string }>()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Button
          type="text"
          icon={<IonIcon name="arrow-back-outline" />}
          onClick={() => history.push(`/app/${appId}/dao/${daoAddress}`)}
        />
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={16}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <CardStatus
                  proposalAddress={proposalAddress}
                  daoAddress={daoAddress}
                />
              </Col>
              <Col span={24}>
                <CardVote
                  proposalAddress={proposalAddress}
                  daoAddress={daoAddress}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={8}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <CardInfo
                  proposalAddress={proposalAddress}
                  daoAddress={daoAddress}
                />
              </Col>
              <Col span={24}>
                <CardProgress
                  proposalAddress={proposalAddress}
                  daoAddress={daoAddress}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
export default ProposalDetails
