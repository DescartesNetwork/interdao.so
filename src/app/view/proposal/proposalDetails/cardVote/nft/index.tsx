import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { DaoData } from '@interdao/core'
import { useWallet } from '@senhub/providers'

import { Button, Card, Col, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import ModalVoteNFT from './modalVoteNFT'
import Withdraw from '../../withdraw'
import LockedVoting from '../lockedVoting'

import { AppState } from 'app/model'
import { ProposalChildCardProps } from '../../index'
import useProposalStatus from 'app/hooks/proposal/useProposalStatus'
import useOwnerNftByCollection from 'app/hooks/useOwnerNftByCollection'
import useProposal from 'app/hooks/proposal/useProposal'

export enum VotingType {
  For = 'For',
  Against = 'Against',
}

const CardVoteByNFT = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  const [votingType, setVotingType] = useState<VotingType>(VotingType.For)
  const [visible, setVisible] = useState(false)
  const daos = useSelector((state: AppState) => state.daos)
  const { mint } = daos[daoAddress] || ({} as DaoData)
  const { status } = useProposalStatus(proposalAddress)
  const { consensusMechanism } = useProposal(proposalAddress, daoAddress)
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const { nfts: collectionNFTs } = useOwnerNftByCollection(walletAddress)
  const myCollection = collectionNFTs?.[mint.toBase58()] || []
  const isLockedVote =
    Object.keys(consensusMechanism || [])[0] === 'lockedTokenCounter'
  const isComplete = useMemo(() => {
    if (status === 'Preparing' || status === 'Voting') return false
    return true
  }, [status])
  const disabled =
    status !== 'Voting' ||
    !account.isAddress(proposalAddress) ||
    !myCollection.length

  const onVoteNftFor = () => {
    setVisible(true)
    setVotingType(VotingType.For)
  }

  const onVoteNftAgainst = () => {
    setVisible(true)
    setVotingType(VotingType.Against)
  }

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5}>Cast your votes</Typography.Title>
        </Col>
        {isLockedVote && (
          <Col span={24}>
            <LockedVoting
              proposalAddress={proposalAddress}
              daoAddress={daoAddress}
            />
          </Col>
        )}
        {isComplete ? (
          <Col span={24}>
            <Withdraw
              daoAddress={daoAddress}
              proposalAddress={proposalAddress}
            />
          </Col>
        ) : (
          <Col span={24}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Button
                  onClick={onVoteNftFor}
                  type="primary"
                  disabled={disabled}
                  block
                  size="large"
                  icon={<IonIcon name="thumbs-up-outline" />}
                >
                  Vote For
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  onClick={onVoteNftAgainst}
                  type="primary"
                  disabled={disabled}
                  block
                  size="large"
                  icon={<IonIcon name="thumbs-down-outline" />}
                >
                  Vote Against
                </Button>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
      <ModalVoteNFT
        visible={visible}
        setVisible={setVisible}
        collection={myCollection}
        votingType={votingType}
        proposalAddress={proposalAddress}
        daoAddress={daoAddress}
      />
    </Card>
  )
}
export default CardVoteByNFT
