import { useCallback, useEffect, useState } from 'react'
import LazyLoad from '@sentre/react-lazyload'
import axios from 'axios'

import { Card, Col, Empty, Image, Row, Space, Spin, Typography } from 'antd'

import useNftMetaData from 'hooks/useNftMetaData'
import { fetchYourOwnerNTFs, MetadataDataType } from 'helpers/metaplex'

import IMAGE_DEFAULT from 'static/images/system/nft.jpeg'
import { useDaoData } from 'hooks/dao'

const NftTreasury = ({ daoAddress }: { daoAddress: string }) => {
  const [listNFTs, setListNFTs] = useState<MetadataDataType[]>()
  const daoData = useDaoData(daoAddress)

  const getYourOwnerNFTs = useCallback(async () => {
    if (!daoData?.master) return setListNFTs(undefined)
    const nfts = await fetchYourOwnerNTFs(daoData.master.toBase58())
    return setListNFTs(nfts)
  }, [daoData?.master])

  useEffect(() => {
    getYourOwnerNFTs()
  }, [getYourOwnerNFTs])

  return (
    <Spin spinning={!listNFTs} tip="Loading...">
      <Row gutter={[8, 8]} style={{ height: 160 }}>
        <Col span={24}>
          <Row align="middle">
            <Col flex="auto">
              <Space align="baseline">
                <Typography.Text type="secondary">Total NFTs</Typography.Text>
              </Space>
            </Col>
            <Col>
              <Typography.Title level={4}>
                {listNFTs?.length || 0}
              </Typography.Title>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]} className="scrollbar">
            {listNFTs?.length !== 0 ? (
              listNFTs?.map((nft) => (
                <Col xs={8} md={8} key={nft.mint}>
                  <LazyLoad height={87}>
                    <CardNFT mintAddress={nft.mint} />
                  </LazyLoad>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Empty description="No NFTs" />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Spin>
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
