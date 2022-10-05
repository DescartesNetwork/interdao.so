import { Button, Col, Image, Radio, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import LOGO from 'static/images/templates/bg-sen-farming.svg'
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

const SenFarming = ({ daoAddress }: { daoAddress: string }) => {
  const [template, setTemplate] = useState(TemplateNames.SenFarmingStake)
  return (
    <Row>
      <Col xs={24} md={16} className="wrap-spl-info">
        <Row gutter={[16, 16]} className="spl-info">
          <Col span={24}>
            <Space size={24}>
              <Image preview={false} src={LOGO} />
              <Space size={0} direction="vertical">
                <Typography.Text>Sen Farming</Typography.Text>
                <Space size={2} style={{ marginLeft: -8 }}>
                  <Button
                    type="text"
                    icon={<IonIcon name="logo-discord" />}
                    onClick={() => {
                      window.open(
                        'https://discord.com/invite/VD7UBAp2HN',
                        'blank',
                      )
                    }}
                  />
                  <Button
                    type="text"
                    icon={<IonIcon name="logo-twitter" />}
                    onClick={() => {
                      window.open('https://twitter.com/SentreProtocol', 'blank')
                    }}
                  />
                  <Button
                    type="text"
                    icon={<IonIcon name="logo-telegram" />}
                    onClick={() => {
                      window.open('https://t.me/Sentre', 'blank')
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
              Sen Farming is the DeFi field of profit, waiting for you to yield.
              Choose from existing Sentre or Community farms, or simply make
              your own. Stake your LPT seeds Grow your assets with incredible
              APR. Harvest them all in one click
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
                    <Radio.Button value={TemplateNames.SenFarmingStake}>
                      <CardOption
                        label="Stake"
                        description="Stake and grow your assets with incredible APR"
                        icon="paper-plane-outline"
                      />
                    </Radio.Button>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12}>
                    <Radio.Button value={TemplateNames.SplApprove} disabled>
                      <CardOption
                        label="Harvest"
                        description="Coming soon..."
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
        <TemplateCreateLoader
          key={template}
          name={template}
          daoAddress={daoAddress}
        />
      </Col>
    </Row>
  )
}

export default SenFarming
