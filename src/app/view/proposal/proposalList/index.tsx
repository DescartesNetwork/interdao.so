import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Col, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ProposalCard from './proposalCard'

import { AppDispatch, AppState } from 'app/model'
import { getProposals } from 'app/model/proposal.controller'
import LazyLoad from '@senswap/react-lazyload'

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
      <Col span={24}>
        <Row gutter={[16, 16]} wrap={false} align="bottom">
          <Col flex="auto">
            <Typography.Title level={4}>Proposals</Typography.Title>
          </Col>
          <Col>
            <Button type="primary" icon={<IonIcon name="add-outline" />}>
              New Proposal
            </Button>
          </Col>
        </Row>
      </Col>
      {proposalAddresses.map((proposalAddress) => (
        <Col key={proposalAddress} span={24}>
          <LazyLoad height={176}>
            <ProposalCard proposalAddress={proposalAddress} />
          </LazyLoad>
        </Col>
      ))}
    </Row>
  )
}

export default ProposalList
