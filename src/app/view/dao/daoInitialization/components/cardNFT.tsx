import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

import { Card, Row, Col, Typography, Image } from 'antd'

import useNftMetaData from 'app/hooks/useNftMetaData'

import IMAGE from 'app/static/images/system/avatar.png'
export type CardNFTProps = {
  mintAddress: string
  onSelect: (mintAddress: string) => void
}

const CardNFT = ({ mintAddress, onSelect }: CardNFTProps) => {
  const [nftImg, setNftImg] = useState('')
  const [loading, setLoading] = useState(false)

  const metadata = useNftMetaData(mintAddress)
  const metadataData = metadata?.data.data

  const getNftInfoFromURI = useCallback(async () => {
    if (!metadata) return
    try {
      setLoading(true)
      const url = metadata.data.data.uri
      if (!url) return

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
      onClick={() => onSelect(mintAddress)}
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Image
            src={nftImg || IMAGE}
            preview={false}
            style={{ borderRadius: 4, minHeight: 198 }}
          />
        </Col>
        <Col span={24}>
          <Row justify="space-between" wrap={false}>
            <Col>
              <Typography.Text>{metadataData?.name}</Typography.Text>
            </Col>
            <Col>
              <Typography.Text type="secondary">
                {metadataData?.symbol}
              </Typography.Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default CardNFT
