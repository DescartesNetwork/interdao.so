import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { DaoData } from '@interdao/core'
import { useWallet } from '@senhub/providers'

import { Button, Card, Col, Row, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import ModalVoteNFT from './modalVoteNFT'
import Withdraw from '../../withdraw'
import LockedVoting from '../lockedVoting'

import { AppState } from 'app/model'
import { ProposalChildCardProps } from '../../index'
import useProposalStatus from 'app/hooks/proposal/useProposalStatus'
import { fetchListNTFs, MetadataDataType } from 'app/helpers/metaplex'

export enum VotingType {
  Agree = 'Agree',
  Disagree = 'Disagree',
}

const CardVoteByNFT = ({
  proposalAddress,
  daoAddress,
}: ProposalChildCardProps) => {
  const [myCollection, setMyCollection] = useState<MetadataDataType[]>([])
  const [votingType, setVotingType] = useState<VotingType>(VotingType.Agree)
  const [visible, setVisible] = useState(false)
  const daoData = useSelector((state: AppState) => state.dao.daos)
  const { mint } = daoData[daoAddress] || ({} as DaoData)
  const { status } = useProposalStatus(proposalAddress)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const disabled = useMemo(() => {
    return (
      status !== 'Voting' ||
      !account.isAddress(proposalAddress) ||
      !myCollection.length
    )
  }, [myCollection.length, proposalAddress, status])

  const onVoteNftFor = () => {
    setVisible(true)
    setVotingType(VotingType.Agree)
  }

  const onVoteNftAgainst = () => {
    setVisible(true)
    setVotingType(VotingType.Disagree)
  }

  const fetchMyNft = useCallback(async () => {
    if (!account.isAddress(walletAddress) || !mint) return
    const collectionNFTs = await fetchListNTFs(walletAddress)
    const mintAddress = mint.toBase58()
    if (collectionNFTs[mintAddress])
      return setMyCollection(collectionNFTs[mintAddress])
  }, [mint, walletAddress])

  useEffect(() => {
    fetchMyNft()
  }, [walletAddress, fetchMyNft])

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row>
            <Col flex="auto">
              <Typography.Title level={5}>Cast your votes</Typography.Title>
            </Col>
            <Col>
              <Withdraw
                daoAddress={daoAddress}
                proposalAddress={proposalAddress}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <LockedVoting
            proposalAddress={proposalAddress}
            daoAddress={daoAddress}
          />
        </Col>
        <Col span={24}>
          <Button
            onClick={onVoteNftFor}
            type="primary"
            disabled={disabled}
            block
            size="large"
            icon={<IonIcon name="thumbs-up-outline" />}
          >
            Agree
          </Button>
        </Col>
        <Col span={24}>
          <Button
            onClick={onVoteNftAgainst}
            type="primary"
            disabled={disabled}
            block
            size="large"
            icon={<IonIcon name="thumbs-down-outline" />}
          >
            Disagree
          </Button>
        </Col>
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
