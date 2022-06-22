import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ReceiptData } from '@interdao/core'
import { useWallet } from '@senhub/providers'

import { AppState } from 'app/model'
import { ProposalState } from 'app/model/proposal.controller'
import { getReceipts } from './useReceipts'

const useWithdrawable = () => {
  const proposals = useSelector((state: AppState) => state.proposal)
  const [withdrawableProposals, setWithdrawableProposals] =
    useState<ProposalState>({})
  const [withdrawableReceipts, setWithdrawableReceipts] = useState<
    (ReceiptData & { address: string })[]
  >([])
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const filterWithdrawable = useCallback(async () => {
    let filteredReceipts: (ReceiptData & { address: string })[] = []
    let filteredProposals: ProposalState = {}
    for (const proposalAddress in proposals) {
      const receipts = await getReceipts(proposalAddress)
      for (const receipt in receipts) {
        if (
          receipts[receipt].authority.toBase58() === walletAddress &&
          Number(proposals[proposalAddress].endDate) < Date.now() / 1000 &&
          proposals[proposalAddress]
        ) {
          filteredReceipts.push({ ...receipts[receipt], address: receipt })
          const proposalAddress = receipts[receipt].proposal.toBase58()
          if (!filteredProposals[proposalAddress]) {
            filteredProposals[proposalAddress] = proposals[proposalAddress]
          }
        }
      }
    }
    setWithdrawableProposals(filteredProposals)
    setWithdrawableReceipts(filteredReceipts)
  }, [proposals, walletAddress])

  useEffect(() => {
    filterWithdrawable()
  }, [filterWithdrawable])

  return { withdrawableReceipts, withdrawableProposals }
}

export default useWithdrawable
