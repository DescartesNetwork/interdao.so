import { Fragment, useCallback, useEffect, useState } from 'react'
import { useWallet } from '@senhub/providers'
import LazyLoad from '@senswap/react-lazyload'

import { Card, Col, Modal, Row, Space, Typography } from 'antd'
import CardNFT from 'app/components/cardNFT'

import { fetchListNTFs, MetadataDataType } from 'app/helpers/metaplex'

import BG_BTN from 'app/static/images/system/select-dao.png'

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
    wallet: { address: walletAddress },
  } = useWallet()

  const getCollectionNFTs = useCallback(async () => {
    const collectionNFTs = await fetchListNTFs(walletAddress)
    if (collectionNFTs) return setListCollectionNFTs(collectionNFTs)
  }, [walletAddress])

  useEffect(() => {
    getCollectionNFTs()
  }, [getCollectionNFTs])

  const onSelectNFT = (mintAddress: string) => {
    onSelect(mintAddress)
    return setVisible(false)
  }

  return (
    <Fragment>
      <Card
        className="btn-select-nft"
        style={{
          background: `url(${BG_BTN})`,
        }}
        bodyStyle={{ padding: 10 }}
        onClick={() => setVisible(true)}
      >
        <Space direction="vertical" style={{ width: '100%' }} align="center">
          <Typography.Text style={{ color: '#f9deb0' }}>Select</Typography.Text>
          <Typography.Text style={{ color: '#f9deb0' }}> a NFT</Typography.Text>
          <Typography.Text style={{ color: '#f9deb0' }}>
            collection
          </Typography.Text>
        </Space>
      </Card>

      <Modal
        visible={visible}
        footer={false}
        onCancel={() => setVisible(false)}
        destroyOnClose={true}
        className="template-modal"
      >
        <Row>
          <Col span={24}>
            <Typography.Title level={4}>
              Select a NFT collection
            </Typography.Title>
          </Col>
          <Col span={24} className="template-info-body">
            <Row gutter={[24, 24]}>
              {listCollectionNFTs &&
                Object.keys(listCollectionNFTs).map((collectionAddress) => (
                  <Col xs={24} md={8} key={collectionAddress}>
                    <LazyLoad height={198}>
                      <CardNFT
                        mintAddress={collectionAddress}
                        onSelect={onSelectNFT}
                      />
                    </LazyLoad>
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default ModalNftCollection
