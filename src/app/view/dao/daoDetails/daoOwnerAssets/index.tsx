import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Button, Card, Spin, Tabs, Tooltip } from 'antd'
import NftTreasury from './nftsTreasury'
import TokenTreasury from './tokenTreasury'

import { AppState } from 'app/model'
import MasterWalletInfo from './masterWalletInfo'

const DaoOwnerAssets = ({ daoAddress }: { daoAddress: string }) => {
  const daos = useSelector((state: AppState) => state.daos)
  const daoMasterAddress = useMemo(() => {
    const { master } = daos[daoAddress] || {}
    return master?.toBase58() || ''
  }, [daos, daoAddress])

  return (
    <Card bordered={false} style={{ height: '100%' }}>
      <Tabs
        className="dao-assets"
        tabBarExtraContent={
          <Tooltip
            placement="bottomLeft"
            overlayClassName="info-member treasury-addr"
            title={<MasterWalletInfo daoAddress={daoMasterAddress} />}
          >
            <Button size="small">Master Wallet</Button>
          </Tooltip>
        }
      >
        <Tabs.TabPane tab="Treasury" key="treasury">
          <TokenTreasury daoAddress={daoAddress} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="NFTs" key="nft">
          <NftTreasury daoAddress={daoAddress} />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  )
}

export default DaoOwnerAssets
