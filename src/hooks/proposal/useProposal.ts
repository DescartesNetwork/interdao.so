import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { ProposalData } from '@interdao/core'

import { AppDispatch, AppState } from 'model'
import { getProposal } from 'model/proposal.controller'

const useProposal = (proposalAddress: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const proposal = useSelector(
    (state: AppState) => state.proposal[proposalAddress],
  )

  const proposalData: ProposalData = useMemo(
    () => proposal || ({} as ProposalData),
    [proposal],
  )

  useEffect(() => {
    if (!proposalData && account.isAddress(proposalAddress))
      dispatch(getProposal({ address: proposalAddress }))
  }, [proposalData, dispatch, proposalAddress])

  return proposalData
}

export default useProposal
