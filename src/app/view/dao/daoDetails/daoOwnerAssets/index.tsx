import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import CopyToClipboard from 'react-copy-to-clipboard'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Card, Col, Row, Space, Tabs, Tooltip, Typography } from 'antd'
import NftTreasury from './nftsTreasury'
import Treasury from './treasury'
import RowSpaceBetween from 'app/components/rowSpaceBetween'

import { asyncWait, shortenAddress } from 'shared/util'
import { AppState } from 'app/model'

const InfoDAOMaster = ({ daoAddress }: { daoAddress: string }) => {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    setCopied(true)
    await asyncWait(1500)
    setCopied(false)
  }

  return (
    <Row>
      <Col span={24}>
        <Space size={8}>
          <IonIcon
            name="information-circle-outline"
            style={{ color: '#f9deb0' }}
          />
          <Typography.Text>
            The treasury should be deposited to facilitate proposals.
          </Typography.Text>
        </Space>
      </Col>
      <Col>
        <RowSpaceBetween
          label="Treasury Address"
          value={
            <Space>
              <Typography.Text className="t-16">
                {shortenAddress(daoAddress)}
              </Typography.Text>
              <Tooltip title="Copied" visible={copied}>
                <CopyToClipboard text={daoAddress} onCopy={onCopy}>
                  <Typography.Text
                    style={{ cursor: 'pointer' }}
                    className="t-16"
                  >
                    <IonIcon name="copy-outline" />
                  </Typography.Text>
                </CopyToClipboard>
              </Tooltip>
            </Space>
          }
        />
      </Col>
    </Row>
  )
}

const DaoOwnerAssets = ({ daoAddress }: { daoAddress: string }) => {
  const daos = useSelector((state: AppState) => state.daos)
  const daoMasterAddress = useMemo(() => {
    const { master } = daos[daoAddress] || {}
    return master?.toBase58() || ''
  }, [daos, daoAddress])

  return (
    <Card bordered={false}>
      <Tabs
        className="dao-assets"
        tabBarExtraContent={
          <Tooltip
            placement="bottomLeft"
            overlayClassName="info-member treasury-addr"
            title={<InfoDAOMaster daoAddress={daoMasterAddress} />}
          >
            <Button size="small">Receive</Button>
          </Tooltip>
        }
      >
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
