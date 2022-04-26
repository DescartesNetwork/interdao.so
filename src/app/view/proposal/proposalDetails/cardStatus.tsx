import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { DaoData } from '@interdao/core'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ProposalStatus from 'app/components/proposalStatus'
import { MintSymbol } from 'shared/antd/mint'

import { ProposalChildCardProps } from './index'
import useProposal from 'app/hooks/useProposal'
import { AppState } from 'app/model'
import configs from 'app/configs'
import { explorer } from 'shared/util'
import useProposalStatus from 'app/hooks/useProposalStatus'

const {
  sol: { interDao },
} = configs

const CardStatus = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  const [loading, setLoading] = useState(false)
  const {
    dao: { daoData },
  } = useSelector((state: AppState) => state)
  const { accountsLen } = useProposal(proposalAddress, daoAddress)
  const { status } = useProposalStatus(proposalAddress)
  const { mint } = daoData[daoAddress] || ({} as DaoData)

  const onExcute = useCallback(async () => {
    setLoading(true)
    try {
      const { txId } = await interDao.executeProposal(proposalAddress)
      window.notify({
        type: 'success',
        description: 'Execute successfully',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
    } catch (error: any) {
      window.notify({
        type: 'error',
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }, [proposalAddress])

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col flex="auto">
          <Space direction="vertical">
            <Space>
              <Typography.Title level={3}>
                Donate to <MintSymbol mintAddress={mint?.toBase58()} />
              </Typography.Title>
              <ProposalStatus status={status} />
            </Space>
            <Space>
              <IonIcon name="people-outline" />
              <Typography.Text>Member: {accountsLen}</Typography.Text>
            </Space>
          </Space>
        </Col>
        <Col>
          <Button
            size="large"
            type="primary"
            onClick={onExcute}
            loading={loading}
          >
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
