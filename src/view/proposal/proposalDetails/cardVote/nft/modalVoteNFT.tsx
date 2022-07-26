import { useCallback, useState } from 'react'
import { account } from '@senswap/sen-js'
import { util } from '@sentre/senhub'

import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import CardNFT from 'components/cardNFT'

import { MetadataDataType } from 'helpers/metaplex'
import configs from 'configs'
import useProposalFee from 'hooks/proposal/useProposalFee'
import { useCommentProposal } from 'hooks/useCommentProposal'
import { VoteState } from 'model/comments.controller'
import { useAnchorProvider } from 'hooks/useAnchorProvider'

const {
  sol: { interDao },
} = configs

type ModalVoteNFTProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  collection: MetadataDataType[]
  votingType: VoteState
  proposalAddress: string
  daoAddress: string
  comment?: string
  onClearComment?: () => void
}

const ModalVoteNFT = ({
  visible,
  setVisible,
  collection,
  votingType,
  proposalAddress,
  daoAddress,
  comment,
  onClearComment = () => {},
}: ModalVoteNFTProps) => {
  const [nftVoting, setNftVoting] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const proposalFee = useProposalFee({ daoAddress })
  const { initTxCommentProposal } = useCommentProposal()
  const provider = useAnchorProvider()

  const onVoteNftFor = useCallback(async () => {
    setLoading(true)
    try {
      if (!account.isAddress(proposalAddress) || !nftVoting) return
      const { tx: txVoteNFT } = await interDao.voteNftFor(
        proposalAddress,
        nftVoting,
        proposalFee,
        false,
      )

      if (!!comment) {
        const receipt = txVoteNFT.instructions[0].keys[7].pubkey.toString()
        const txComment = await initTxCommentProposal({
          content: comment,
          proposal: proposalAddress,
          voteState: votingType,
          receipt,
        })
        txVoteNFT.add(txComment)
      }
      const txId = await provider.sendAndConfirm(txVoteNFT)

      setNftVoting('')
      onClearComment()
      return window.notify({
        type: 'success',
        description: 'Voted successfully. Click to view details!',
        onClick: () => window.open(util.explorer(txId), '_blank'),
      })
    } catch (error: any) {
      return window.notify({
        type: 'error',
        description: error.message,
      })
    } finally {
      setVisible(false)
      setLoading(false)
    }
  }, [
    comment,
    initTxCommentProposal,
    nftVoting,
    onClearComment,
    proposalAddress,
    proposalFee,
    provider,
    setVisible,
    votingType,
  ])

  const onVoteNftAgainst = useCallback(async () => {
    setLoading(true)
    try {
      if (!account.isAddress(proposalAddress) || !nftVoting) return

      const { txId } = await interDao.voteNftAgainst(
        proposalAddress,
        nftVoting,
        proposalFee,
      )
      setNftVoting('')
      return window.notify({
        type: 'success',
        description: 'Voted successfully. Click to view details!',
        onClick: () => window.open(util.explorer(txId), '_blank'),
      })
    } catch (error: any) {
      return window.notify({
        type: 'error',
        description: error.message,
      })
    } finally {
      setLoading(false)
      setVisible(false)
    }
  }, [nftVoting, proposalAddress, proposalFee, setVisible])

  const onConfirm = () => {
    switch (votingType) {
      case VoteState.For:
        onVoteNftFor()
        break
      case VoteState.Against:
        onVoteNftAgainst()
        break
    }
  }

  return (
    <Modal
      className="modal-nft-selection"
      visible={visible}
      footer={false}
      onCancel={() => setVisible(false)}
    >
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Typography.Title level={4}>
            Vote {votingType === 'vote-for' ? 'For' : 'Against'}
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Text>Choose NFT to vote</Typography.Text>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]} className="scrollbar" style={{ height: 240 }}>
            {collection.map((metadata) => (
              <Col
                xs={12}
                md={8}
                key={metadata.mint}
                style={{ textAlign: 'center' }}
              >
                <CardNFT
                  mintAddress={metadata.mint}
                  isSelected={nftVoting === metadata.mint}
                  onSelect={setNftVoting}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Space>
            <Button onClick={() => setVisible(false)}>Cancel</Button>
            <Button
              disabled={!nftVoting}
              type="primary"
              loading={loading}
              onClick={onConfirm}
            >
              Confirm
            </Button>
          </Space>
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalVoteNFT
