import { useCallback, useMemo, useState } from 'react'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ProposalStatus from 'app/components/proposalStatus'

import { ProposalChildCardProps } from './index'
import { explorer, shortenAddress } from 'shared/util'
import useProposalStatus from 'app/hooks/useProposalStatus'
import useProposalMetaData from 'app/hooks/useProposalMetaData'
import useReceipts from 'app/hooks/useReceipts'
import configs from 'app/configs'

const {
  sol: { interDao },
} = configs

const CardStatus = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  const [loading, setLoading] = useState(false)

  const { status } = useProposalStatus(proposalAddress)
  const metaData = useProposalMetaData(proposalAddress)
  const { receipts } = useReceipts({ proposalAddress })

  const members = useMemo(() => {
    if (!Object.values(receipts).length) return 0
    const authorities: string[] = []

    for (const receipt of Object.values(receipts)) {
      const { authority } = receipt
      if (authorities.includes(authority.toBase58())) continue
      authorities.push(authority.toBase58())
    }

    return authorities.length
  }, [receipts])

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
        <Col span={24}>
          <Row gutter={[24, 24]} wrap={false}>
            <Col flex="auto">
              <Space direction="vertical">
                <Row gutter={[8, 8]} align="middle">
                  <Col>
                    <Typography.Title
                      level={3}
                      style={{ wordBreak: 'break-all' }}
                    >
                      {metaData?.title
                        ? metaData.title
                        : shortenAddress(proposalAddress)}
                    </Typography.Title>
                  </Col>
                  <Col>
                    <ProposalStatus status={status} />
                  </Col>
                </Row>
                <Space>
                  <IonIcon name="people-outline" />
                  <Typography.Text>Member: {members}</Typography.Text>
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
          </Row>
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
