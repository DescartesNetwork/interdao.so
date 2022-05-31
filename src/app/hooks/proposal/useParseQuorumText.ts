import { useMemo } from 'react'
import { ConsensusQuorum } from '@interdao/core'

const useParseQuorumText = (quorum?: ConsensusQuorum) => {
  const quorumText = useMemo(() => {
    if (!quorum) return '-'
    const mechanismQuorum = Object.keys(quorum)[0]
    if (mechanismQuorum === 'half') return '1/2'
    if (mechanismQuorum === 'oneThird') return '1/3'
    if (mechanismQuorum === 'twoThird') return '2/3'
  }, [quorum])

  return quorumText
}
export default useParseQuorumText
