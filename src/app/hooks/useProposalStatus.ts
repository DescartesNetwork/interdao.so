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
  } = proposal[proposalAddress] || {}

  const isSuccess = useMemo(() => {
    const quorum = consensusQuorum ? Object.keys(consensusQuorum)[0] : ''
    const votingPower = Number(votingForPower) - Number(votingAgainstPower)
    const numSupply = supply?.toNumber() || 0
    if (votingPower <= 0) return false
    if (quorum === 'half' && votingPower >= numSupply / 2) return true
    if (quorum === 'oneThird' && votingPower >= numSupply / 3) return true
    if (quorum === 'twoThird' && votingPower >= (numSupply * 2) / 3) return true
    return false
  }, [consensusQuorum, supply, votingAgainstPower, votingForPower])

  const status: ProposalStatusType = useMemo(() => {
    if (currentDate < Number(startDate)) return 'Preparing'
    if (currentDate < Number(endDate)) return 'Voting'
    if (executed) return 'Executed'
    if (isSuccess) return 'Succeeded'
    return 'Failed'
  }, [endDate, executed, isSuccess, startDate])

  return { status, isSuccess }
}

export default useProposalStatus
