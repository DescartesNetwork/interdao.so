import { useWallet } from '@senhub/providers'
import LazyLoad from '@senswap/react-lazyload'
import {
  Button,
  Card,
  Checkbox,
  Col,
  Image,
  Modal,
  Row,
  Typography,
} from 'antd'
import {
  fetchListNTFs,
  fetchNftFromURI,
  MetadataDataType,
} from 'app/helpers/metaplex'
import useNftMetaData from 'app/hooks/useNftMetaData'
import { AppDispatch, AppState } from 'app/model'
import { setVoteNFT } from 'app/model/voteNFT.controller'

import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type ModalVoteNFTProps = {
  visible: boolean
  setVisible: (visible: boolean) => void
  collectionAddress: string
}
type CardNFTProps = {
  mintAddress: string
}

const ModalVoteNFT = ({
  visible,
  setVisible,
  collectionAddress,
}: ModalVoteNFTProps) => {
  const [listCollectionNFTs, setListCollectionNFTs] =
    useState<Record<string, MetadataDataType[]>>()
  const {
    wallet: { address },
  } = useWallet()

  const getListNFTsBelongToCollection = useCallback(async () => {
    let collectionNFTs = await fetchListNTFs(address)
    console.log('collectionNFTs: ', collectionNFTs[collectionAddress])
    if (collectionNFTs) {
      setListCollectionNFTs(collectionNFTs)
    }
  }, [address, collectionAddress])

  useEffect(() => {
    if (!address) return
    getListNFTsBelongToCollection()
  }, [address, getListNFTsBelongToCollection])

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
          <Typography.Title level={4}>Select a NFT collection</Typography.Title>
        </Col>
        <Col span={24}>
          <Typography.Text>Choose NFTs to vote</Typography.Text>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            {listCollectionNFTs &&
              listCollectionNFTs[collectionAddress].map((metadata) => (
                <Col xs={24} md={8} key={metadata.mint}>
                  <LazyLoad height={198}>
                    <CardNFT mintAddress={metadata.mint} />
                  </LazyLoad>
                </Col>
              ))}
          </Row>
        </Col>
        <Col span={24}>
          <Button>Test</Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalVoteNFT

const CardNFT = ({ mintAddress }: CardNFTProps) => {
  const metadata = useNftMetaData(mintAddress)
  const [nftInfo, setNftInfo] = useState<any>()
  const { nftAddress: nftAddressSelected } = useSelector(
    (state: AppState) => state.voteNFT,
  )
  const dispatch = useDispatch<AppDispatch>()

  const getNftInfoFromURI = useCallback(async () => {
    if (!metadata) return
    if (!metadata.data.data.uri) return
    const nftInfoData = await fetchNftFromURI(metadata.data.data.uri)
    if (!nftInfoData) return
    setNftInfo(nftInfoData)
  }, [metadata])

  useEffect(() => {
    getNftInfoFromURI()
  }, [getNftInfoFromURI])

  return (
    <Card
      bordered={false}
      style={{ overflow: 'hidden', cursor: 'pointer', height: '100%' }}
      bodyStyle={{ padding: 1, height: '100%' }}
    >
      <Row style={{ height: '100%' }} justify="space-between" align="bottom">
        {mintAddress === nftAddressSelected && (
          <Checkbox
            style={{
              position: 'absolute',
              top: -2,
              right: 2,
              zIndex: 1,
              borderRadius: 4,
            }}
            checked={true}
          />
        )}
        <Col span={24}>
          <Image
            src={nftInfo?.image}
            preview={false}
            style={{ borderRadius: '4px', minWidth: '198px' }}
            onClick={() => {
              dispatch(setVoteNFT(mintAddress))
            }}
          />
        </Col>
        <Col span={24} style={{ textAlign: 'center', paddingTop: '8px' }}>
          <Typography.Text>{nftInfo?.name}</Typography.Text>
        </Col>
      </Row>
    </Card>
  )
}
