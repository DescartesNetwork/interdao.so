import { Fragment, useCallback, useEffect, useState } from 'react'
import { useWallet } from '@senhub/providers'
import { account } from '@senswap/sen-js'
import axios from 'axios'

import { Card, Col, Empty, Image, Modal, Row, Space, Typography } from 'antd'
import CardNFT from 'app/components/cardNFT'
import SearchNftCollection from './searchNftCollection'

import {
  fetchListNTFs,
  getNftMetaData,
  MetadataDataType,
} from 'app/helpers/metaplex'
import useNftMetaData from 'app/hooks/useNftMetaData'

import BG_BTN from 'app/static/images/system/select-dao.png'
import IMAGE_DEFAULT from 'app/static/images/system/avatar.png'

const SIZE_COLLECTION_IMAGE = 88

type ModalNftCollectionProps = {
  onSelect: (mintAddress: string) => void
  mintAddress: string
}

const CardNftImageOnly = ({
  mintAddress,
  openNftModal,
}: {
  mintAddress: string
  openNftModal: (visible: boolean) => void
}) => {
  const [nftImg, setNftImg] = useState('')
  const [loading, setLoading] = useState(false)
  const { metadata } = useNftMetaData(mintAddress)

  const getNftInfoFromURI = useCallback(async () => {
    if (!metadata) return setNftImg(IMAGE_DEFAULT)
    try {
      setLoading(true)
      const url = metadata.data.data.uri
      if (!url) return setNftImg(IMAGE_DEFAULT)

      const response = await axios.get(url)
      const img = response.data.image
      return setNftImg(img)
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }, [metadata])

  useEffect(() => {
    getNftInfoFromURI()
  }, [getNftInfoFromURI])

  return (
    <Card
      bordered={false}
      bodyStyle={{ padding: 0 }}
      loading={loading}
      className="card-nft-image-only"
      onClick={() => openNftModal(true)}
    >
      <Image
        src={nftImg}
        preview={false}
        style={{ borderRadius: 4 }}
        width={SIZE_COLLECTION_IMAGE}
        height={SIZE_COLLECTION_IMAGE}
        className="nft-image"
      />
    </Card>
  )
}

const ModalNftCollection = ({
  onSelect,
  mintAddress,
}: ModalNftCollectionProps) => {
  const [visible, setVisible] = useState(false)
  const [listCollectionNFTs, setListCollectionNFTs] =
    useState<Record<string, MetadataDataType[]>>()
  const [searchText, setSearchText] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const getNftCollectionInfo = useCallback(async () => {
    let collectionNFTs: Record<string, MetadataDataType[]> = {}
    if (!account.isAddress(searchText)) return collectionNFTs
    let collectionInfo = await getNftMetaData(searchText)
    if (collectionInfo.data) {
      collectionNFTs[collectionInfo.data.mint] = [collectionInfo.data]
    } else {
      collectionNFTs = {}
    }
    return collectionNFTs
  }, [searchText])

  const onSelectNFT = (mintAddress: string) => {
    onSelect(mintAddress)
    onCloseModal()
  }

  const onCloseModal = () => {
    setSearchText('')
    setVisible(false)
  }

  const getCollectionNFTs = useCallback(async () => {
    setLoading(true)
    let collectionNFTs: Record<string, MetadataDataType[]> = {}
    try {
      if (searchText.length > 0) {
        collectionNFTs = await getNftCollectionInfo()
      } else {
        collectionNFTs = await fetchListNTFs(walletAddress)
      }
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
    return setListCollectionNFTs(collectionNFTs)
  }, [getNftCollectionInfo, searchText, walletAddress])

  useEffect(() => {
    getCollectionNFTs()
  }, [getCollectionNFTs])

  return (
    <Fragment>
      {!mintAddress ? (
        <Card
          className="btn-select-nft"
          style={{
            background: `url(${BG_BTN})`,
          }}
          bodyStyle={{ padding: 10 }}
          onClick={() => setVisible(true)}
        >
          <Space direction="vertical" style={{ width: '100%' }} align="center">
            <Typography.Text style={{ color: '#f9deb0' }}>
              Select
            </Typography.Text>
            <Typography.Text style={{ color: '#f9deb0' }}>
              a NFT
            </Typography.Text>
            <Typography.Text style={{ color: '#f9deb0' }}>
              collection
            </Typography.Text>
          </Space>
        </Card>
      ) : (
        <CardNftImageOnly openNftModal={setVisible} mintAddress={mintAddress} />
      )}

      <Modal
        className="modal-nft-selection"
        visible={visible}
        footer={false}
        onCancel={onCloseModal}
      >
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Typography.Title level={4}>
              Select a NFT collection
            </Typography.Title>
          </Col>
          <Col span={24}>
            <SearchNftCollection
              loading={loading}
              searchText={searchText}
              onSearch={(value) => setSearchText(value)}
            />
          </Col>
          <Col span={24}>
            <Row
              gutter={[24, 24]}
              className="scrollbar"
              style={{ height: 500 }}
            >
              {listCollectionNFTs &&
              Object.keys(listCollectionNFTs).length > 0 ? (
                Object.keys(listCollectionNFTs).map((collectionAddress) => (
                  <Col xs={12} md={8} key={collectionAddress}>
                    <CardNFT
                      mintAddress={collectionAddress}
                      onSelect={onSelectNFT}
                    />
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <Empty />
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default ModalNftCollection
