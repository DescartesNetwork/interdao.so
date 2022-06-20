import { Button, Col, Image, Radio, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import TransferSplPlugin from './transfer'

import SOLANA_LOGO from 'app/static/images/templates/solana.svg'
import { useState } from 'react'
import ApproveSplPlugin from './approve'

type CardOptionProps = {
  label: string
  description: string
  icon: string
}

const CardOption = ({ label, description, icon }: CardOptionProps) => {
  return (
    <Row>
      <Col span={24}>
        <Row>
          <Col flex="auto">
            <Typography.Title level={5}>{label}</Typography.Title>
          </Col>
          <Col>
            <IonIcon style={{ fontSize: 24 }} name={icon} />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Typography.Text type="secondary">{description}</Typography.Text>
      </Col>
    </Row>
  )
}

enum Template {
  Transfer,
  Approve,
}
const SPL = ({ daoAddress }: { daoAddress: string }) => {
  const [template, setTemplate] = useState(Template.Transfer)

  return (
    <Row>
      <Col xs={24} md={16} className="wrap-spl-info">
        <Row gutter={[16, 16]} className="spl-info">
          <Col span={24}>
            <Space size={24}>
              <Image preview={false} src={SOLANA_LOGO} />
              <Space size={0} direction="vertical">
                <Typography.Text>Solana Program Library</Typography.Text>
                <Space size={2} style={{ marginLeft: -8 }}>
                  <Button type="text" icon={<IonIcon name="logo-discord" />} />
                  <Button type="text" icon={<IonIcon name="logo-twitter" />} />
                  <Button type="text" icon={<IonIcon name="logo-telegram" />} />
                </Space>
              </Space>
            </Space>
          </Col>
          <Col span={24}>
            <Typography.Paragraph
              type="secondary"
              ellipsis={{ rows: 3, expandable: true, symbol: 'View more' }}
            >
              The Solana Program Library (SPL) is a collection of on-chain
              programs targeting the Sealevel parallel runtime. These programs
              are tested against Solana's implementation of Sealevel,
              solana-runtime, and deployed to its mainnet. As others implement
              Sealevel, we will graciously accept patches to ensure the programs
              here are portable across all implementations.
            </Typography.Paragraph>
          </Col>
          <Col span={24}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Typography.Text>Templates</Typography.Text>
              <Radio.Group
                value={template}
                style={{ width: '100%' }}
                className="select-spl-option"
                onChange={(e) => setTemplate(e.target.value)}
              >
                <Row gutter={[24, 24]}>
                  <Col xs={24} sm={12} md={12} lg={12}>
                    <Radio.Button value={Template.Transfer}>
                      <CardOption
                        label="Transfer"
                        description="Transfer token to another wallet address"
                        icon="paper-plane-outline"
                      />
                    </Radio.Button>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12}>
                    <Radio.Button value={Template.Approve}>
                      <CardOption
                        label="Approve"
                        description="Coming soon"
                        icon="thumbs-up-outline"
                      />
                    </Radio.Button>
                  </Col>
                </Row>
              </Radio.Group>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col xs={24} md={8} className="spl-option-transfer">
        {template === Template.Approve && (
          <ApproveSplPlugin daoAddress={daoAddress} />
        )}
        {template === Template.Transfer && (
          <TransferSplPlugin daoAddress={daoAddress} />
        )}
      </Col>
    </Row>
  )
}

export default SPL
