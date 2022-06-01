import { Card, Tabs } from 'antd'
import NftTreasury from './nftsTreasury'
import Treasury from './treasury'

const DaoOwnerAssets = ({ daoAddress }: { daoAddress: string }) => {
  return (
    <Card bordered={false}>
      <Tabs className="dao-assets">
        <Tabs.TabPane tab="Treasury" key="treasury">
          <Treasury daoAddress={daoAddress} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="NFTs" key="nft">
          <NftTreasury daoAddress={daoAddress} />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  )
}

export default DaoOwnerAssets
