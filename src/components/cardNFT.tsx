import { useMemo } from 'react'
import { useWidth } from '@sentre/senhub'

import { Card, Row, Col, Typography, Image } from 'antd'

import useNftMetaData from 'hooks/useNftMetaData'
import IonIcon from '@sentre/antd-ionicon'

import IMAGE_DEFAULT from 'static/images/system/nft.jpeg'

export type CardNFTProps = {
  mintAddress: string
  onSelect: (mintAddress: string) => void
  isSelected?: boolean
}

const SIZE_DESKTOP = 198
const SIZE_MOBILE = 150

const CardNFT = ({ mintAddress, onSelect, isSelected }: CardNFTProps) => {
  const width = useWidth()

  const imageSize = useMemo(() => {
    if (width < 768) return SIZE_MOBILE
    return SIZE_DESKTOP
  }, [width])

  const { nftInfo, loading } = useNftMetaData(mintAddress)

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
            src={nftInfo?.image || IMAGE_DEFAULT}
            preview={false}
            style={{ borderRadius: 4 }}
            width={imageSize}
            height={imageSize}
          />
        </Col>
        <Col span={24} style={{ textAlign: 'center', paddingTop: '8px' }}>
          <Typography.Text>{nftInfo?.name}</Typography.Text>
        </Col>
      </Row>
    </Card>
  )
}

export default CardNFT
