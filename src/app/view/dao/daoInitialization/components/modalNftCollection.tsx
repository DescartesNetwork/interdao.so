import { useWallet } from '@senhub/providers'
import LazyLoad from '@senswap/react-lazyload'
import { Col, Modal, Row, Typography } from 'antd'
import { fetchListNTFs, MetadataDataType } from 'app/helpers/metaplex'
import { useCallback, useEffect, useState } from 'react'
import CardNFT from './cardNFT'

type ModalNftCollectionProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  onSelect: (mintAddress: string) => void
}

const ModalNftCollection = ({
  visible,
  setVisible,
  onSelect,
}: ModalNftCollectionProps) => {
  const [listCollectionNFTs, setListCollectionNFTs] =
    useState<Record<string, MetadataDataType[]>>()
  const {
    wallet: { address },
  } = useWallet()

  const getListCollectionNFTs = useCallback(async () => {
    let collectionNFTs = await fetchListNTFs(address)
    if (collectionNFTs) {
      setListCollectionNFTs(collectionNFTs)
    }
  }, [address])

  useEffect(() => {
    if (!address) return
    getListCollectionNFTs()
  }, [address, getListCollectionNFTs])

  return (
    <Modal
      visible={visible}
      footer={false}
      onCancel={() => setVisible(false)}
      destroyOnClose={true}
      className="template-modal"
    >
      <Row>
        <Col span={24} style={{ textAlign: 'left' }}>
          <Typography.Title level={4}>Select a NFT collection</Typography.Title>
        </Col>
        <Col span={24} className="template-info-body">
          <Row gutter={[24, 24]}>
            {listCollectionNFTs &&
              Object.keys(listCollectionNFTs).map((collectionAddress) => (
                <Col xs={24} md={8} key={collectionAddress}>
                  <LazyLoad height={198}>
                    <CardNFT
                      mintAddress={collectionAddress}
                      onSelect={onSelect}
                    />
                  </LazyLoad>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalNftCollection
