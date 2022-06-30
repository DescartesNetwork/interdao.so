import React from 'react'
import { useSelector } from 'react-redux'

import { Space, Typography, Avatar } from 'antd'
import GradientAvatar from '../gradientAvatar'

import useProposalMetaData from 'hooks/proposal/useProposalMetaData'
import { AppState } from 'model'
import useMetaData from 'hooks/useMetaData'

type ProposalItemProps = {
  proposalAddress: string
}

const ProposalItem = ({ proposalAddress }: ProposalItemProps) => {
  const proposals = useSelector((state: AppState) => state.proposal)
  const { metaData: proposalMetaData } = useProposalMetaData(proposalAddress)
  const { metaData: daoMetaData } = useMetaData(
    proposals[proposalAddress].dao.toBase58(),
  )

  return (
    <Space size={8} style={{ width: '100%' }}>
      {!daoMetaData?.image ? (
        <GradientAvatar
          seed={proposals[proposalAddress].dao.toBase58()}
          avatarProps={{ shape: 'square', size: 49 }}
        />
      ) : (
        <Avatar shape="square" size={49} src={daoMetaData?.image} />
      )}
      <Space size={4} direction="vertical">
        <Typography.Title level={5}>{proposalMetaData?.title}</Typography.Title>
        <Typography.Text style={{ color: '#A08D70' }}>
          {proposalMetaData?.description}
        </Typography.Text>
      </Space>
    </Space>
  )
}

export default ProposalItem
