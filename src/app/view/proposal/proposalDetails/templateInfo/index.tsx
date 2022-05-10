import { Fragment, useCallback, useEffect, useState } from 'react'
import { AccountMeta } from '@solana/web3.js'
import BN from 'bn.js'
import { decodeSplInstruction } from 'sen-idl-parser'

import { Col, Modal, Row, Typography } from 'antd'
import TemplateTransfer, { TransferType } from './transferInfo'

import useProposal from 'app/hooks/useProposal'
import { ProposalChildCardProps } from '../index'

const Template = ({ proposalAddress, daoAddress }: ProposalChildCardProps) => {
  const [transferInfo, setTransferInfo] = useState<TransferType>()
  const [templateName, setTemplateName] = useState('')

  const { accounts, data } = useProposal(proposalAddress, daoAddress)
  const fetchProposalInfo = useCallback(async () => {
    if (!accounts || !data) return
    const info = decodeSplInstruction<{ amount: BN }>(
      accounts as AccountMeta[],
      data as Buffer,
    )
    if (!info) return
    setTemplateName(info.name)
    if (info.name === 'transfer') {
      const { splt } = window.sentre
      const sourceAssociated =
        info.accounts.get('source')?.pubkey.toBase58() || ''
      const sourceAddress =
        info.accounts.get('authority')?.pubkey.toBase58() || ''
      const destination =
        info.accounts.get('destination')?.pubkey.toBase58() || ''
      const { amount } = info.data
      let mintAddress = ''

      try {
        const { mint } = await splt.getAccountData(sourceAssociated)
        mintAddress = mint
      } catch (error) {
        mintAddress = ''
      }
      return setTransferInfo({
        source: sourceAddress,
        destination,
        amount: amount.toNumber(),
        mint: mintAddress,
      })
    }
  }, [accounts, data])

  useEffect(() => {
    fetchProposalInfo()
  }, [fetchProposalInfo])

  if (templateName === 'transfer')
    return <TemplateTransfer transferInfo={transferInfo} />
  return <Fragment />
}

const TemplateInfo = ({
  proposalAddress,
  daoAddress,
  visible,
  setVisible,
}: ProposalChildCardProps & {
  visible: boolean
  setVisible: (visible: boolean) => void
}) => {
  return (
    <Modal
      className="template-card template-info"
      visible={visible}
      footer={false}
      onCancel={() => setVisible(false)}
    >
      <Row>
        <Col
          className="template-info-header"
          span={24}
          style={{ textAlign: 'left' }}
        >
          <Typography.Title level={4}>Template information</Typography.Title>
        </Col>
        <Col span={24} className="template-info-body">
          <Template proposalAddress={proposalAddress} daoAddress={daoAddress} />
        </Col>
      </Row>
    </Modal>
  )
}

export default TemplateInfo
