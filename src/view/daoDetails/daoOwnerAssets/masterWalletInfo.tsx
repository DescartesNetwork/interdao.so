import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { util } from '@sentre/senhub'

import QRcode from 'qrcode.react'
import IonIcon from '@sentre/antd-ionicon'
import { Col, Row, Space, Tooltip, Typography } from 'antd'

import RowSpaceBetween from 'components/ui/rowSpaceBetween'

const MasterWalletInfo = ({ daoAddress }: { daoAddress: string }) => {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    setCopied(true)
    await util.asyncWait(1500)
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
                {util.shortenAddress(daoAddress)}
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

export default MasterWalletInfo
