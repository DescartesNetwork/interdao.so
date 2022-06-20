import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { AccountMeta } from '@solana/web3.js'
import { decodeSplInstruction } from 'sen-idl-parser'
import BN from 'bn.js'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import ProposalStatus from 'app/components/proposalStatus'

import { ProposalChildCardProps } from './index'
import { explorer, shortenAddress } from 'shared/util'
import useProposalStatus from 'app/hooks/proposal/useProposalStatus'
import useProposalMetaData from 'app/hooks/proposal/useProposalMetaData'
import useReceipts from 'app/hooks/proposal/useReceipts'
import configs from 'app/configs'
// import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import { AppState } from 'app/model'
import useProposal from 'app/hooks/proposal/useProposal'

const {
  sol: { interDao },
} = configs

const {
  sentre: { splt },
} = window

const CardStatus = ({ proposalAddress }: ProposalChildCardProps) => {
  const { proposal } = useSelector((state: AppState) => state)
  const [loading, setLoading] = useState(false)
  const [mintAddress, setMintAddress] = useState('')
  const { status } = useProposalStatus(proposalAddress)
  const { metaData } = useProposalMetaData(proposalAddress)
  const { accounts, data } = useProposal(
    proposalAddress,
    proposal[proposalAddress].dao.toBase58(),
  )
  // const { balance } = useAccountBalanceByMintAddress(mintAddress)

  const getAssociatedAddress = useCallback(async () => {
    if (!accounts || !data) return 0
    const info = decodeSplInstruction<{ amount: BN }>(
      accounts as AccountMeta[],
      data as Buffer,
    )
    if (!info) return 0
    console.log('info:', info.data.amount.toNumber())
    const sourceAssociated =
      info.accounts.get('source')?.pubkey.toBase58() || ''

    try {
      const { mint } = await splt.getAccountData(sourceAssociated)

      const associatedAddress = await splt.deriveAssociatedAddress(
        proposal[proposalAddress].dao.toBase58(),
        mint,
      )
      setMintAddress(associatedAddress)
    } catch (error) {
      console.log(error)
      setMintAddress('')
    }
  }, [accounts, data, proposal, proposalAddress])

  useEffect(() => {
    getAssociatedAddress()
  }, [getAssociatedAddress])

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
                <Space>
                  <Typography.Title
                    level={3}
                    style={{ wordBreak: 'break-all' }}
                  >
                    {metaData?.title
                      ? metaData.title
                      : shortenAddress(proposalAddress)}
                  </Typography.Title>

                  <ProposalStatus status={status} />
                </Space>
                <Space>
                  <Row>
                    <Col span={24}>
                      <IonIcon
                        name="people-outline"
                        style={{ marginRight: 5 }}
                      />
                      <Typography.Text>Member: {members}</Typography.Text>
                    </Col>
                    <Col span={24}>
                      <IonIcon
                        name="warning-outline"
                        style={{ marginRight: 5, color: '#F9575E' }}
                      />
                      <Typography.Text style={{ color: '#F9575E' }}>
                        The treasury balance is not enough to execute this
                        proposal
                      </Typography.Text>
                    </Col>
                  </Row>
                </Space>
              </Space>
            </Col>
            <Col>
              <Button
                size="large"
                type="primary"
                onClick={execute}
                loading={loading}
                disabled={status !== 'Succeeded'}
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
