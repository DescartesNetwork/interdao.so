import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'

import { AppDispatch, AppState } from 'app/model'
import { ProposalData } from '@interdao/core'
import { getProposal, getProposals } from 'app/model/proposal.controller'

const useProposal = (proposalAddress: string, daoAddress: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const { proposal } = useSelector((state: AppState) => state)

  const data = useMemo(
    () => proposal[proposalAddress] || ({} as ProposalData),
    [proposal, proposalAddress],
  )
  const isExistProposal = useMemo(() => {
    return !!Object.keys(proposal).length
  }, [proposal])

  useEffect(() => {
    if (isExistProposal && account.isAddress(proposalAddress)) {
      dispatch(getProposal({ address: proposalAddress }))
    } else {
      dispatch(getProposals({ daoAddress }))
    }
  }, [daoAddress, dispatch, isExistProposal, proposalAddress])

  return { ...data }
}

export default useProposal
