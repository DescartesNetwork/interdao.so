import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ReceiptData } from '@interdao/core'
import { useWalletAddress } from '@sentre/senhub'

import { AppState } from 'model'
import { ProposalState } from 'model/proposal.controller'

const useWithdrawable = () => {
  const receipts = useSelector((state: AppState) => state.receipt)
  const proposals = useSelector((state: AppState) => state.proposal)
  const [withdrawableProposals, setWithdrawableProposals] =
    useState<ProposalState>({})
  const [withdrawableReceipts, setWithdrawableReceipts] = useState<
    (ReceiptData & { address: string })[]
  >([])
  const walletAddress = useWalletAddress()

  const filterWithdrawable = useCallback(async () => {
    let filteredReceipts: (ReceiptData & { address: string })[] = []
    let filteredProposals: ProposalState = {}
    for (const receiptAddr in receipts) {
      const proposalAddress = receipts[receiptAddr].proposal.toBase58()
      if (
        receipts[receiptAddr].authority.toBase58() === walletAddress &&
        Number(proposals[proposalAddress].endDate) < Date.now() / 1000 &&
        proposals[proposalAddress] &&
        receipts[receiptAddr].amount.toNumber() > 0
      ) {
        filteredReceipts.push({
          ...receipts[receiptAddr],
          address: receiptAddr,
        })
        const proposalAddress = receipts[receiptAddr].proposal.toBase58()
        if (!filteredProposals[proposalAddress]) {
          filteredProposals[proposalAddress] = proposals[proposalAddress]
        }
      }
    }
    setWithdrawableProposals(filteredProposals)
    setWithdrawableReceipts(filteredReceipts)
  }, [proposals, receipts, walletAddress])

  useEffect(() => {
    filterWithdrawable()
  }, [filterWithdrawable])

  return { withdrawableReceipts, withdrawableProposals }
}

export default useWithdrawable
