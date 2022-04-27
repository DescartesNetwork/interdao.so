import { Button, Col, Image, Radio, Row, Space, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'
import TransferSplPlugin from './transfer'

import SOLANA_LOGO from 'app/static/images/templates/solana.svg'

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

const SPL = ({ daoAddress }: { daoAddress: string }) => {
  return (
    <Row>
      <Col span={16} style={{ background: ' #2b2523' }}>
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
            <Typography.Text type="secondary">
              The Solana Program Library (SPL) is a collection of on-chain
              programs targeting the Sealevel parallel runtime. These programs
              are tested against Solana's implementation of Sealevel,
              solana-runtime, and deployed to its mainnet. As others implement
              Sealevel, we will graciously accept patches to ensure the programs
              here are portable across all implementations.
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Typography.Text>Templates</Typography.Text>
              <Radio.Group
                value="transfer"
                style={{ width: '100%' }}
                className="select-spl-option"
              >
                <Row gutter={[24, 24]}>
                  <Col xs={24} sm={12} md={12} lg={12}>
                    <Radio.Button value="transfer">
                      <CardOption
                        label="Transfer"
                        description="Transfer token to another wallet address"
                        icon="paper-plane-outline"
                      />
                    </Radio.Button>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12}>
                    <Radio.Button value="approve" disabled>
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
      <Col span={8} className="spl-option-transfer">
        <TransferSplPlugin daoAddress={daoAddress} />
      </Col>
    </Row>
  )
}

export default SPL
