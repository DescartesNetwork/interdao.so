import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LazyLoad from '@senswap/react-lazyload'
import { useWallet } from '@senhub/providers'
import { DaoRegimes } from '@interdao/core'
import isEqual from 'react-fast-compare'
import { SystemProgram } from '@solana/web3.js'

import { Button, Col, Empty, Row, Select, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ProposalCard from './proposalCard'

import { AppDispatch, AppState } from 'app/model'
import { getProposals } from 'app/model/proposal.controller'
import Template from 'app/view/templates'
import { setVisible } from 'app/model/template.controller'

export type ProposalListProps = { daoAddress: string }

const currentDate = Math.floor(Number(new Date()) / 1000)

const ProposalList = ({ daoAddress }: ProposalListProps) => {
  const [status, setStatus] = useState('all-status')
  const {
    proposal,
    dao: { daoData },
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const { regime, authority } = daoData[daoAddress] || {
    regime: DaoRegimes.Dictatorial,
    authority: SystemProgram.programId,
  }

  const isSuccess = useCallback(
    (quorum: string, votingPower: number, numSupply: number) => {
      if (votingPower <= 0) return false
      if (quorum === 'half' && votingPower >= numSupply / 2) return true
      if (quorum === 'oneThird' && votingPower >= numSupply / 3) return true
      if (quorum === 'twoThird' && votingPower >= (numSupply * 2) / 3)
        return true
      return false
    },
    [],
  )

  const authorized = useMemo(() => {
    if (isEqual(regime, DaoRegimes.Autonomous)) return true
    if (isEqual(regime, DaoRegimes.Democratic)) return true
    if (authority.toBase58() === walletAddress) return true
    return false
  }, [regime, authority, walletAddress])

  const proposalAddresses = useMemo(() => {
    const expandedProposal = Object.keys(proposal).map((address) => ({
      address,
      ...proposal[address],
    }))
    return expandedProposal
      .filter(({ dao }) => dao.toBase58() === daoAddress)
      .map(({ address }) => address)
  }, [proposal, daoAddress])

  const filterProposalAddresses = useMemo(() => {
    if (!proposalAddresses.length) return []
    const filteredAddress = []

    for (const address of proposalAddresses) {
      let valid = false
      const {
        endDate,
        startDate,
        executed,
        supply,
        votingForPower,
        consensusQuorum,
        votingAgainstPower,
      } = proposal[address] || {}

      const quorum = consensusQuorum ? Object.keys(consensusQuorum)[0] : ''
      const votingPower = Number(votingForPower) - Number(votingAgainstPower)
      const numSupply = supply?.toNumber() || 0

      switch (status) {
        case 'preparing':
          valid = currentDate < Number(startDate)
          break
        case 'voting':
          valid =
            currentDate <= Number(endDate) && currentDate >= Number(startDate)
          break
        case 'executed':
          valid = executed
          break
        case 'succeeded':
          valid =
            isSuccess(quorum, votingPower, numSupply) &&
            !executed &&
            currentDate > Number(endDate)
          break
        case 'failed':
          valid =
            !isSuccess(quorum, votingPower, numSupply) &&
            currentDate > Number(endDate)
          break
        default:
          valid = true
          break
      }
      if (valid) filteredAddress.push(address)
    }
    return filteredAddress
  }, [isSuccess, proposal, proposalAddresses, status])

  useEffect(() => {
    dispatch(getProposals({ daoAddress }))
  }, [dispatch, daoAddress])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={[16, 16]} wrap={false} align="bottom">
          <Col flex="auto">
            <Typography.Title level={4}>Proposals</Typography.Title>
          </Col>
          <Col>
            <Space>
              <Select
                className="select-filter-proposal"
                defaultValue="all-status"
                onChange={setStatus}
                style={{ width: 150 }}
              >
                <Select.Option value="all-status">All status</Select.Option>
                <Select.Option value="preparing">Preparing</Select.Option>
                <Select.Option value="voting">Voting</Select.Option>
                <Select.Option value="succeeded">Succeeded</Select.Option>
                <Select.Option value="executed">Executed</Select.Option>
                <Select.Option value="failed">Failed</Select.Option>
              </Select>
              <Button
                type="primary"
                icon={<IonIcon name="add-outline" />}
                onClick={() => dispatch(setVisible(true))}
                disabled={!authorized}
              >
                New Proposal
              </Button>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row>
          {filterProposalAddresses.length ? (
            filterProposalAddresses.map((proposalAddress) => (
              <Col key={proposalAddress} span={24}>
                <LazyLoad height={176}>
                  <ProposalCard proposalAddress={proposalAddress} />
                </LazyLoad>
              </Col>
            ))
          ) : (
            <Col span={24} style={{ textAlign: 'center' }}>
              <Empty />
            </Col>
          )}
        </Row>
      </Col>
      <Template daoAddress={daoAddress} />
    </Row>
  )
}

export default ProposalList
