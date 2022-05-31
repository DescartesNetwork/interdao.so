import { useCallback, useState } from 'react'
import LazyLoad from '@senswap/react-lazyload'
import { account } from '@senswap/sen-js'

import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import CardNFT from 'app/components/cardNFT'

import { MetadataDataType } from 'app/helpers/metaplex'
import configs from 'app/configs'
import { explorer } from 'shared/util'
import { VotingType } from './index'
import useProposalFee from 'app/hooks/proposal/useProposalFee'

const {
  sol: { interDao },
} = configs

type ModalVoteNFTProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  collection: MetadataDataType[]
  votingType: VotingType
  proposalAddress: string
  daoAddress: string
}

const ModalVoteNFT = ({
  visible,
  setVisible,
  collection,
  votingType,
  proposalAddress,
  daoAddress,
}: ModalVoteNFTProps) => {
  const [nftVoting, setNftVoting] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const proposalFee = useProposalFee({ daoAddress })

  const onVoteNftFor = useCallback(async () => {
    setLoading(true)
    try {
      if (!account.isAddress(proposalAddress)) return

      const { txId } = await interDao.voteNftFor(
        proposalAddress,
        nftVoting,
        proposalFee,
      )
      window.notify({
        type: 'success',
        description: 'Voted successfully. Click to view details!',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
      setVisible(false)
    } catch (error: any) {
      window.notify({
        type: 'error',
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }, [nftVoting, proposalAddress, proposalFee, setVisible])

  const onVoteNftAgainst = useCallback(async () => {
    setLoading(true)
    try {
      if (!account.isAddress(proposalAddress)) return

      const { txId } = await interDao.voteNftAgainst(
        proposalAddress,
        nftVoting,
        proposalFee,
      )
      window.notify({
        type: 'success',
        description: 'Voted successfully. Click to view details!',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
      setVisible(false)
    } catch (error: any) {
      window.notify({
        type: 'error',
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }, [nftVoting, proposalAddress, proposalFee, setVisible])

  const onConfirm = () => {
    if (!nftVoting)
      return window.notify({
        type: 'error',
        description: 'Please select a NFT!',
      })
    switch (votingType) {
      case VotingType.Agree:
        onVoteNftFor()
        break
      case VotingType.Disagree:
        onVoteNftAgainst()
        break
      default:
        break
    }
  }

  return (
    <Modal
      visible={visible}
      footer={false}
      onCancel={() => setVisible(false)}
      destroyOnClose={true}
      className="template-modal"
    >
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Typography.Title level={4}>Vote {votingType}</Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Text>Choose NFT to vote</Typography.Text>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            {collection.map((metadata) => (
              <Col xs={24} md={8} key={metadata.mint}>
                <LazyLoad height={198}>
                  <CardNFT
                    mintAddress={metadata.mint}
                    isSelected={nftVoting === metadata.mint}
                    onSelect={setNftVoting}
                  />
                </LazyLoad>
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Space>
            <Button onClick={() => setVisible(false)}>Cancel</Button>
            <Button type="primary" loading={loading} onClick={onConfirm}>
              Confirm
            </Button>
          </Space>
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalVoteNFT
