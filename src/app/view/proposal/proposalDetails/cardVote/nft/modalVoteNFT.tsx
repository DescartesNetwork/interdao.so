import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWallet } from '@senhub/providers'
import { DaoData, FeeOptions } from '@interdao/core'
import LazyLoad from '@senswap/react-lazyload'
import { account } from '@senswap/sen-js'
import { BN } from 'bn.js'

import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import CardNFT from './cardNFT'

import { fetchListNTFs, MetadataDataType } from 'app/helpers/metaplex'
import configs from 'app/configs'
import { explorer } from 'shared/util'
import { AppState } from 'app/model'
import { VotingType } from './index'

const {
  sol: { interDao, taxman, fee },
} = configs

type ModalVoteNFTProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  collectionAddress: string
  votingType: VotingType
  proposalAddress: string
  daoAddress: string
}

const ModalVoteNFT = ({
  visible,
  setVisible,
  collectionAddress,
  votingType,
  proposalAddress,
  daoAddress,
}: ModalVoteNFTProps) => {
  const [listCollectionNFTs, setListCollectionNFTs] =
    useState<Record<string, MetadataDataType[]>>()
  const [nftVoting, setNftVoting] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const {
    wallet: { address },
  } = useWallet()
  const { daos } = useSelector((state: AppState) => state.dao)
  const { regime, authority } = daos[daoAddress] || ({} as DaoData)

  const parseRegime = useMemo(() => {
    if (!regime) return ''
    return Object.keys(regime)[0]
  }, [regime])

  const proposalFee = useMemo(() => {
    if (!parseRegime || !authority) return

    const feeOption: FeeOptions = {
      tax: new BN(fee),
      taxmanAddress: taxman,
      revenue: new BN(fee),
      revenuemanAddress: authority.toBase58(),
    }

    if (parseRegime === 'democratic')
      return {
        tax: new BN(0),
        taxmanAddress: taxman,
        revenue: new BN(0),
        revenuemanAddress: authority.toBase58(),
      }

    return feeOption
  }, [authority, parseRegime])

  const getListNFTsBelongToCollection = useCallback(async () => {
    let collectionNFTs = await fetchListNTFs(address)
    if (collectionNFTs) {
      setListCollectionNFTs(collectionNFTs)
    }
  }, [address])

  useEffect(() => {
    if (!address) return
    getListNFTsBelongToCollection()
  }, [address, getListNFTsBelongToCollection])

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
    if (!nftVoting) {
      return window.notify({
        type: 'error',
        description: 'Please select a NFT!',
      })
    }
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
            {listCollectionNFTs &&
              listCollectionNFTs[collectionAddress].map((metadata) => (
                <Col xs={24} md={8} key={metadata.mint}>
                  <LazyLoad height={198}>
                    <CardNFT
                      mintAddress={metadata.mint}
                      nftAddressSelected={nftVoting}
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
