import { Card, Row, Col, Typography, Image } from 'antd'
import { fetchNftFromURI } from 'app/helpers/metaplex'
import useNftMetaData from 'app/hooks/useNftMetaData'
import { useCallback, useEffect, useState } from 'react'

export type CardNFTProps = {
  mintAddress: string
  onSelect: (mintAddress: string) => void
}

const CardNFT = ({ mintAddress, onSelect }: CardNFTProps) => {
  const metadata = useNftMetaData(mintAddress)
  const [nftInfo, setNftInfo] = useState<any>()

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
        <Col span={24}>
          <Image
            src={nftInfo?.image}
            preview={false}
            style={{ borderRadius: '4px', minWidth: '198px' }}
            onClick={() => onSelect(mintAddress)}
          />
        </Col>
        <Col span={24}>
          <Row
            style={{ paddingTop: '8px' }}
            justify="space-between"
            wrap={false}
          >
            <Col>
              <Typography.Text style={{ padding: 1 }}>
                {nftInfo?.name}
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text style={{ padding: 1 }} type="secondary">
                {nftInfo?.symbol}
              </Typography.Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default CardNFT
