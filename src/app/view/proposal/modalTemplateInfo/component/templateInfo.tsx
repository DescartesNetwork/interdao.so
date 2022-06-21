import { Fragment, useCallback, useEffect, useState } from 'react'
import { AccountMeta } from '@solana/web3.js'
import { decodeSplInstruction } from 'sen-idl-parser'
import BN from 'bn.js'

import TemplateTransfer, { TransferType } from '../transferInfo'

import useProposal from 'app/hooks/proposal/useProposal'
import { ProposalChildCardProps } from '../../proposalDetails/index'
import BlankTemplateInfo from '../blankTemplateInfo'

type TemplateInfoProps = {
  isProposalDetail?: boolean
  endTime?: number
} & ProposalChildCardProps

const TemplateInfo = ({
  proposalAddress,
  daoAddress,
  isProposalDetail = true,
  endTime,
}: TemplateInfoProps) => {
  const [transferInfo, setTransferInfo] = useState<TransferType>()
  const [templateName, setTemplateName] = useState('')

  const { accounts, data } = useProposal(proposalAddress, daoAddress)
  const fetchProposalInfo = useCallback(async () => {
    if (!accounts || !data) return
    const info = decodeSplInstruction<{ amount: BN }>(
      accounts as AccountMeta[],
      data as Buffer,
    )
    if (!info) return setTemplateName('blank')
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
    return (
      <TemplateTransfer
        isProposalDetail={isProposalDetail}
        transferInfo={transferInfo}
        endTime={endTime}
      />
    )
  if (templateName === 'blank')
    return (
      <BlankTemplateInfo
        isProposalDetail={isProposalDetail}
        endTime={endTime}
      />
    )
  return <Fragment />
}

export default TemplateInfo
