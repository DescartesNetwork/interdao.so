import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

import { Card, Row, Col, Typography, Image, Checkbox } from 'antd'

import useNftMetaData from 'app/hooks/useNftMetaData'

import IMAGE_DEFAULT from 'app/static/images/system/avatar.png'

export type CardNFTProps = {
  mintAddress: string
  onSelect: (mintAddress: string) => void
  isSelected?: boolean
}

const CardNFT = ({ mintAddress, onSelect, isSelected }: CardNFTProps) => {
  const [nftImg, setNftImg] = useState('')
  const [loading, setLoading] = useState(false)

  const metadata = useNftMetaData(mintAddress)
  const metadataData = metadata?.data.data

  const getNftInfoFromURI = useCallback(async () => {
    if (!metadata) return setNftImg(IMAGE_DEFAULT)
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
        {isSelected && (
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
            src={nftImg || IMAGE_DEFAULT}
            preview={false}
            style={{ borderRadius: 4, minHeight: 198 }}
          />
        </Col>
        <Col span={24} style={{ textAlign: 'center', paddingTop: '8px' }}>
          <Typography.Text>{metadataData?.name}</Typography.Text>
        </Col>
      </Row>
    </Card>
  )
}

export default CardNFT
