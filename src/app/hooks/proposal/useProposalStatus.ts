import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ProposalData } from '@interdao/core'
import BN from 'bn.js'

import { ProposalStatusType } from 'app/components/proposalStatus'

import { AppState } from 'app/model'

const currentDate = Math.floor(Number(new Date()) / 1000)

const useProposalStatus = (proposalAddress: string) => {
  const proposal = useSelector((state: AppState) => state.proposal)
  const {
    startDate,
    endDate,
    executed,
    supply,
    votingAgainstPower,
    votingForPower,
    consensusQuorum,
    consensusMechanism,
  } = proposal[proposalAddress] || ({} as ProposalData)

  const actualSupply = useMemo(() => {
    if (!supply) return new BN(0)
    const mechanism = consensusMechanism
      ? Object.keys(consensusMechanism)[0]
      : ''
    if (mechanism === 'stakedTokenCounter') return supply
    return supply.mul(endDate.sub(startDate))
  }, [consensusMechanism, endDate, startDate, supply])

  const isSuccess = useMemo(() => {
    const quorum = consensusQuorum ? Object.keys(consensusQuorum)[0] : ''
    if (!votingAgainstPower || !votingAgainstPower) return false
    const votingPower = votingForPower.sub(votingAgainstPower)

    if (votingPower.lte(new BN(0))) return false
    if (quorum === 'half' && votingPower.cmp(actualSupply.div(new BN(2))) === 1)
      return true
    if (
      quorum === 'oneThird' &&
      votingPower.cmp(actualSupply.div(new BN(3))) === 1
    )
      return true
    if (
      quorum === 'twoThird' &&
      votingPower.cmp(actualSupply.mul(new BN(2)).div(new BN(3))) === 1
    )
      return true
    return false
  }, [actualSupply, consensusQuorum, votingAgainstPower, votingForPower])

  const status: ProposalStatusType = useMemo(() => {
    if (!proposal) return 'Loading'
    if (currentDate < Number(startDate)) return 'Preparing'
    if (currentDate < Number(endDate)) return 'Voting'
    if (executed) return 'Executed'
    if (isSuccess) return 'Succeeded'
    return 'Failed'
  }, [endDate, executed, isSuccess, proposal, startDate])

  return { status, isSuccess, actualSupply }
}

export default useProposalStatus
