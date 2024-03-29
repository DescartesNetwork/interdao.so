import { Button, Col, Avatar, Radio, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import ZETA_LOGO from 'static/images/templates/logo-zeta.jpeg'
import { TemplateCreateLoader } from 'templates/templateLoader'
import { TemplateNames } from 'templates/constant'
import { useState } from 'react'

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

const Zeta = ({ daoAddress }: { daoAddress: string }) => {
  const [template, setTemplate] = useState(TemplateNames.ZetaDeposit)
  return (
    <Row>
      <Col xs={24} md={16} className="wrap-spl-info">
        <Row gutter={[16, 16]} className="spl-info">
          <Col span={24}>
            <Space size={24}>
              <Avatar src={ZETA_LOGO} size={56} shape="square" />
              <Space size={0} direction="vertical">
                <Typography.Text>Zeta</Typography.Text>
                <Space size={2} style={{ marginLeft: -8 }}>
                  <Button
                    type="text"
                    icon={<IonIcon name="logo-discord" />}
                    onClick={() => {
                      window.open(
                        'https://discord.com/invite/SacGBFKNzQ',
                        'blank',
                      )
                    }}
                  />
                  <Button
                    type="text"
                    icon={<IonIcon name="logo-twitter" />}
                    onClick={() => {
                      window.open('https://twitter.com/ZetaMarkets', 'blank')
                    }}
                  />
                </Space>
              </Space>
            </Space>
          </Col>
          <Col span={24}>
            <Typography.Paragraph
              type="secondary"
              ellipsis={{ rows: 3, expandable: true, symbol: 'View more' }}
            >
              The world's first options and futures DEX. Zeta (ζ) is the premier
              under-collateralized DeFi derivatives platform, providing liquid
              derivatives trading to individuals and institutions alike. Powered
              by @solana x @serum.
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
                    <Radio.Button value={TemplateNames.ZetaCreate}>
                      <CardOption
                        label="Create"
                        description="Create margin account"
                        icon="add-circle-outline"
                      />
                    </Radio.Button>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12}>
                    <Radio.Button value={TemplateNames.ZetaDeposit}>
                      <CardOption
                        label="Deposit"
                        description="Deposit token to your Zeta account"
                        icon="download-outline"
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
        <TemplateCreateLoader name={template} daoAddress={daoAddress} />
      </Col>
    </Row>
  )
}

export default Zeta
