import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'app/model'
import { ProposalStatusType } from 'app/components/proposalStatus'

const currentDate = Math.floor(Number(new Date()) / 1000)

const useProposalStatus = (proposalAddress: string) => {
  const { proposal } = useSelector((state: AppState) => state)
  const {
    startDate,
    endDate,
    executed,
    supply,
    votingAgainstPower,
    votingForPower,
    consensusQuorum,
    consensusMechanism,
  } = proposal[proposalAddress] || {}

  const actualSupply = useMemo(() => {
    if (!supply) return 0
    const mechanism = consensusMechanism
      ? Object.keys(consensusMechanism)[0]
      : ''
    if (mechanism === 'StakedTokenCounter') return supply.toNumber()
    return Number(supply) * (Number(endDate) - Number(startDate))
  }, [consensusMechanism, endDate, startDate, supply])

  const isSuccess = useMemo(() => {
    const quorum = consensusQuorum ? Object.keys(consensusQuorum)[0] : ''

    const votingPower = Number(votingForPower) - Number(votingAgainstPower)
    if (votingPower <= 0) return false
    if (quorum === 'half' && votingPower > actualSupply / 2) return true
    if (quorum === 'oneThird' && votingPower > actualSupply / 3) return true
    if (quorum === 'twoThird' && votingPower > (actualSupply * 2) / 3)
      return true
    return false
  }, [actualSupply, consensusQuorum, votingAgainstPower, votingForPower])

  const status: ProposalStatusType = useMemo(() => {
    if (currentDate < Number(startDate)) return 'Preparing'
    if (currentDate < Number(endDate)) return 'Voting'
    if (executed) return 'Executed'
    if (isSuccess) return 'Succeeded'
    return 'Failed'
  }, [endDate, executed, isSuccess, startDate])

  return { status, isSuccess, actualSupply }
}

export default useProposalStatus
