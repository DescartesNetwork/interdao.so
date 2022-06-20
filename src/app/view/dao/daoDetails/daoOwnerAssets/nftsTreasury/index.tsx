import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import LazyLoad from '@sentre/react-lazyload'
import axios from 'axios'

import { Card, Col, Image, Row } from 'antd'

import useNftMetaData from 'app/hooks/useNftMetaData'
import { fetchYourOwnerNTFs, MetadataDataType } from 'app/helpers/metaplex'
import { AppState } from 'app/model'

import IMAGE_DEFAULT from 'app/static/images/system/avatar.png'

const NftTreasury = ({ daoAddress }: { daoAddress: string }) => {
  const [listNFTs, setListNFTs] = useState<MetadataDataType[]>()
  const daos = useSelector((state: AppState) => state.daos)

  const daoMasterAddress = useMemo(() => {
    const { master } = daos[daoAddress] || {}
    return master?.toBase58() || ''
  }, [daos, daoAddress])

  const getYourOwnerNFTs = useCallback(async () => {
    const nfts = await fetchYourOwnerNTFs(daoMasterAddress)
    return setListNFTs(nfts)
  }, [daoMasterAddress])

  useEffect(() => {
    getYourOwnerNFTs()
  }, [getYourOwnerNFTs])

  return (
    <Row gutter={[8, 8]} className="scrollbar" style={{ height: 160 }}>
      {listNFTs &&
        listNFTs.map((nft) => (
          <Col xs={8} md={8} key={nft.mint}>
            <LazyLoad height={87}>
              <CardNFT mintAddress={nft.mint} />
            </LazyLoad>
          </Col>
        ))}
    </Row>
  )
}

export default NftTreasury

const CardNFT = ({ mintAddress }: { mintAddress: string }) => {
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
      style={{ cursor: 'pointer' }}
      bodyStyle={{ padding: 8 }}
      loading={loading}
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Image
            src={nftImg}
            preview={false}
            style={{ borderRadius: 4 }}
            width={87}
            height={87}
          />
        </Col>
      </Row>
    </Card>
  )
}
