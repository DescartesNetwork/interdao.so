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
import MultisigWallet from 'app/helpers/mutisigWallet'
import { account } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'
// import { createMultisigWallet } from 'app/helpers/mutisigWallet'

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

  const {
    wallet: { address: walletAddress },
  } = useWallet()

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

  const test = async () => {
    try {
      const multiSigWallet = new MultisigWallet()
      await multiSigWallet.createNewToken()
      await multiSigWallet.mintToAccount(account.fromAddress(walletAddress))
      window.notify({
        type: 'success',
        description: 'Create multisig wallet successfully.',
      })
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    }
  }

  return (
    <Card bordered={false}>
      <Button onClick={test}>Test</Button>
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
