import { ReactNode } from 'react'

import { Avatar, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import useNftMetaData from 'app/hooks/useNftMetaData'
import IMAGE_DEFAULT from 'app/static/images/nft.jpeg'

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
      <Typography.Text> NFT</Typography.Text>
    </Space>
  )
}

export default AvatarNFT
