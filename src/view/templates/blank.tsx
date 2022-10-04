import IonIcon from '@sentre/antd-ionicon'
import { Col, Row, Space, Image, Typography, Button } from 'antd'
import { TemplateNames } from 'templates/constant'
import { TemplateCreateLoader } from 'templates/templateLoader'

import SENTRE_LOGO from 'static/images/sentre_logo.svg'

const Blank = ({ daoAddress }: { daoAddress: string }) => {
  return (
    <Row>
      <Col span={24} className="wrap-spl-info">
        <Row gutter={[16, 16]} className="spl-info">
          <Col span={24}>
            <Space size={24}>
              <Image preview={false} src={SENTRE_LOGO} />
              <Space size={0} direction="vertical">
                <Typography.Text>The Blank Template</Typography.Text>
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
              Create a proposal with a blank template without making a
              transaction.
            </Typography.Paragraph>
          </Col>
          <Col span={24}>
            <TemplateCreateLoader
              name={TemplateNames.BlankTemplate}
              daoAddress={daoAddress}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Blank
