import { Col, Row, Space, Image, Typography } from 'antd'
import { TemplateCreateLoader } from 'templates/templateLoader'

import { TemplateNames } from 'templates/constant'
import LOGO from 'static/images/templates/meanfi.png'
import { EmbeddedViewData } from 'templates/view/embedded-view/configs'

const CONFIGS: EmbeddedViewData = {
  appId: 'meanfi',
  logo: `url(${LOGO})`,
  title: 'Meanfi template',
  url: 'https://app.meanfi.com/',
}

const Meanfi = ({ daoAddress }: { daoAddress: string }) => {
  return (
    <Row>
      <Col span={24} className="wrap-spl-info">
        <Row gutter={[16, 16]} className="spl-info">
          <Col span={24}>
            <Space size={24}>
              <Image preview={false} src={LOGO} style={{ height: 56 }} />
              <Space size={0} direction="vertical">
                <Typography.Text>Meanfi application template</Typography.Text>
              </Space>
            </Space>
          </Col>
          <Col span={24}>
            <Typography.Paragraph
              type="secondary"
              ellipsis={{ rows: 3, expandable: true, symbol: 'View more' }}
            >
              Manage Your Treasury With Real-Time Finance
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

export default Meanfi
