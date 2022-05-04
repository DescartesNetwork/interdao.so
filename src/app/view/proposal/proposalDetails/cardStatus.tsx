import { useCallback, useMemo, useState } from 'react'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ProposalStatus from 'app/components/proposalStatus'

import { ProposalChildCardProps } from './index'
import useProposal from 'app/hooks/useProposal'
import configs from 'app/configs'
import { explorer, shortenAddress } from 'shared/util'
import useProposalStatus from 'app/hooks/useProposalStatus'
import useProposalMetaData from 'app/hooks/useProposalMetaData'

const {
  sol: { interDao },
} = configs

const CardStatus = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  const [loading, setLoading] = useState(false)

  const { accountsLen } = useProposal(proposalAddress, daoAddress)
  const { status } = useProposalStatus(proposalAddress)
  const metaData = useProposalMetaData(proposalAddress)

  const disabled = useMemo(() => {
    if (status === 'Succeeded') return false
    return true
  }, [status])

  const execute = useCallback(async () => {
    setLoading(true)
    try {
      const { txId } = await interDao.executeProposal(proposalAddress)
      return window.notify({
        type: 'success',
        description: 'Execute successfully',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
    } catch (error: any) {
      return window.notify({
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
                {metaData?.title
                  ? metaData.title
                  : shortenAddress(proposalAddress)}
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
            onClick={execute}
            loading={loading}
            disabled={disabled}
          >
            Execute
          </Button>
        </Col>
        <Col span={24}>
          <Typography.Paragraph
            type="secondary"
            ellipsis={{ rows: 3, expandable: true, symbol: 'View more' }}
          >
            {metaData?.description}
          </Typography.Paragraph>
        </Col>
      </Row>
    </Card>
  )
}

export default CardStatus
