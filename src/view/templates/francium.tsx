import IonIcon from '@sentre/antd-ionicon'

import { Col, Row, Space, Image, Typography, Button } from 'antd'
import { TemplateCreateLoader } from 'templates/templateLoader'

import { TemplateNames } from 'templates/constant'
import LOGO from 'static/images/templates/francium.png'
import { EmbeddedViewData } from 'templates/view/embedded-view/configs'

const CONFIGS: EmbeddedViewData = {
  appId: 'francium',
  logo: `url(${LOGO})`,
  title: 'Francium template',
  url: 'https://francium.io/app/mypage',
}

const Francium = ({ daoAddress }: { daoAddress: string }) => {
  return (
    <Row>
      <Col span={24} className="wrap-spl-info">
        <Row gutter={[16, 16]} className="spl-info">
          <Col span={24}>
            <Space size={24}>
              <Image preview={false} src={LOGO} style={{ height: 56 }} />
              <Space size={0} direction="vertical">
                <Typography.Text>Francium application template</Typography.Text>
                <Space size={2} style={{ marginLeft: -8 }}>
                  <Button
                    type="text"
                    icon={<IonIcon name="logo-discord" />}
                    onClick={() => {
                      window.open(
                        'https://discord.com/invite/aGXvPNGXDT',
                        'blank',
                      )
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
              Francium is the DeFi Yield Strategy Platform on Solana
            </Typography.Paragraph>
          </Col>
          <Col span={24}>
            <TemplateCreateLoader
              name={TemplateNames.EmbeddedView}
              daoAddress={daoAddress}
              defaultData={CONFIGS}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Francium
