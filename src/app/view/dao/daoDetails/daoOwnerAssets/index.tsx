import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Button, Card, Col, Row, Space, Tabs, Tooltip, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import QRcode from 'qrcode.react'
import NftTreasury from './nftsTreasury'
import TokenTreasury from './tokenTreasury'
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
    <Row justify="center" gutter={[16, 16]} style={{ padding: 12 }}>
      <Col span={24}>
        <Space size={8}>
          <IonIcon
            name="information-circle-outline"
            style={{ color: '#f9deb0' }}
          />
          <Typography.Text>You can deposit to this address</Typography.Text>
        </Space>
      </Col>
      <Col style={{ background: '#f4f4f5', paddingTop: 8 }}>
        <QRcode
          value={daoAddress}
          size={110}
          bgColor="#ffffff"
          fgColor="#1f1f1f"
        />
      </Col>
      <Col span={24}>
        <RowSpaceBetween
          label="DAO Master Address:"
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
