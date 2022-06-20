import { useCallback, useEffect, useMemo, useState } from 'react'
import { useUI } from '@senhub/providers'
import axios from 'axios'

import { Card, Row, Col, Typography, Image } from 'antd'

import useNftMetaData from 'app/hooks/useNftMetaData'
import IonIcon from '@sentre/antd-ionicon'

import IMAGE_DEFAULT from 'app/static/images/system/nft.jpeg'

export type CardNFTProps = {
  mintAddress: string
  onSelect: (mintAddress: string) => void
  isSelected?: boolean
}

const SIZE_DESKTOP = 198
const SIZE_MOBILE = 150

const CardNFT = ({ mintAddress, onSelect, isSelected }: CardNFTProps) => {
  const [nftImg, setNftImg] = useState('')
  const [loading, setLoading] = useState(false)
  const {
    ui: { width },
  } = useUI()

  const imageSize = useMemo(() => {
    if (width < 768) return SIZE_MOBILE
    return SIZE_DESKTOP
  }, [width])

  const { metadata } = useNftMetaData(mintAddress)
  const metadataData = metadata?.data.data

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
      style={{ cursor: 'pointer', textAlign: 'center' }}
      bodyStyle={{ padding: 0 }}
      loading={loading}
      onClick={() => onSelect(mintAddress)}
    >
      <Row>
        {isSelected && (
          <IonIcon
            name="checkbox"
            style={{
              position: 'absolute',
              top: -1,
              right: -1,
              fontSize: 20,
              zIndex: 1,
            }}
          />
        )}
        <Col span={24} style={{ textAlign: 'center', width: imageSize }}>
          <Image
            src={nftImg}
            preview={false}
            style={{ borderRadius: 4 }}
            width={imageSize}
            height={imageSize}
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
