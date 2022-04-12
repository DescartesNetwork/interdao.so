import { useSelector } from 'react-redux'
import { DaoData } from '@interdao/core'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ProposalStatus from 'app/components/proposalStatus'

import { ProposalChildCardProps } from './index'
import useProposal from 'app/hooks/useProposal'
import { AppState } from 'app/model'
import { MintSymbol } from 'shared/antd/mint'

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

export default CardStatus
