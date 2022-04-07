import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Row } from 'antd'
import ProposalCard from './proposalCard'

import { AppDispatch, AppState } from 'app/model'
import { getProposals } from 'app/model/proposal.controller'

export type ProposalListProps = { daoAddress: string }

const ProposalList = ({ daoAddress }: ProposalListProps) => {
  const { proposal } = useSelector((state: AppState) => state)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getProposals({ daoAddress }))
  }, [dispatch, daoAddress])

  const proposalAddresses = useMemo(() => {
    const expandedProposal = Object.keys(proposal).map((address) => ({
      address,
      ...proposal[address],
    }))
    return expandedProposal
      .filter(({ dao }) => dao.toBase58() === daoAddress)
      .map(({ address }) => address)
  }, [proposal, daoAddress])

  return (
    <Row gutter={[24, 24]}>
      {proposalAddresses.map((proposalAddress) => (
        <Col key={proposalAddress} xs={24} md={12} lg={8} xl={6}>
          <ProposalCard proposalAddress={proposalAddress} />
        </Col>
      ))}
    </Row>
  )
}

export default ProposalList
