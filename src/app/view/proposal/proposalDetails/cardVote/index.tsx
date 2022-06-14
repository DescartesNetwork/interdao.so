import { useSelector } from 'react-redux'
import { DaoData } from '@interdao/core'

import CardVoteByNFT from './nft'
import CardVoteToken from './token'

import { AppState } from 'app/model'
import { ProposalChildCardProps } from '../index'

const CardVote = ({ proposalAddress, daoAddress }: ProposalChildCardProps) => {
  const daos = useSelector((state: AppState) => state.daos)

  const { isNft } = daos?.[daoAddress] || ({} as DaoData)

  return isNft ? (
    <CardVoteByNFT proposalAddress={proposalAddress} daoAddress={daoAddress} />
  ) : (
    <CardVoteToken proposalAddress={proposalAddress} daoAddress={daoAddress} />
  )
}

export default CardVote
