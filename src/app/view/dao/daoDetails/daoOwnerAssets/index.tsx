import { Card, Tabs } from 'antd'
import Treasury from './treasury'

const DaoOwnerAssets = ({ daoAddress }: { daoAddress: string }) => {
  return (
    <Card bordered={false}>
      <Tabs>
        <Tabs.TabPane tab="Treasury" key="treasury">
          <Treasury daoAddress={daoAddress} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="NFTs" key="nft" disabled />
      </Tabs>
    </Card>
  )
}

export default DaoOwnerAssets
