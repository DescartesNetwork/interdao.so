import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { ProposalData } from '@interdao/core'

import { AppDispatch, AppState } from 'app/model'
import { getProposal } from 'app/model/proposal.controller'

const useProposal = (proposalAddress: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const proposals = useSelector((state: AppState) => state.proposal)

  const proposalData = useMemo(
    () => proposals[proposalAddress] || ({} as ProposalData),
    [proposals, proposalAddress],
  )

  useEffect(() => {
    if (!proposalData && account.isAddress(proposalAddress))
      dispatch(getProposal({ address: proposalAddress }))
  }, [proposalData, dispatch, proposalAddress])

  return { ...proposalData }
}

export default useProposal
