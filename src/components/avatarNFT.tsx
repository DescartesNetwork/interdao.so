import { ReactNode } from 'react'

import { Avatar, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import useNftMetaData from 'hooks/useNftMetaData'
import IMAGE_DEFAULT from 'static/images/system/nft.jpeg'

type AvatarNFTProps = {
  mintAddress: string
  size?: number
  icon?: ReactNode
}

const AvatarNFT = ({
  mintAddress,
  size = 24,
  icon = <IonIcon name="diamond-outline" />,
}: AvatarNFTProps) => {
  const { nftInfo } = useNftMetaData(mintAddress)
  return (
    <Space>
      <Avatar shape="square" size={size} src={nftInfo?.image || IMAGE_DEFAULT}>
        {icon}
      </Avatar>
      <Typography.Text style={{ fontSize: size > 24 ? 38 : undefined }}>
        {' '}
        NFT
      </Typography.Text>
    </Space>
  )
}

export default AvatarNFT
