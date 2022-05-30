import { Button, Col, Input, Row, Space, Typography } from 'antd'
import { useState } from 'react'
import isEqual from 'react-fast-compare'
import { MintSelection } from 'shared/antd/mint'
import ModalNftCollection from '../../components/modalNftCollection'
import './index.less'

export type TokenAddressInputProps = {
  value: string
  onChange: (value: string) => void
  isNFT: boolean
  onChangeNFT: (isNFT: boolean) => void
}

const TokenAddressInput = ({
  value,
  onChange,
  isNFT = false,
  onChangeNFT,
}: TokenAddressInputProps) => {
  const [visible, setVisible] = useState(false)

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text>Vote by</Typography.Text>
      </Col>
      <Col flex={1}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Space>
              <Button
                onClick={() => onChangeNFT(false)}
                className={isEqual(isNFT, false) ? '' : 'btn-unselect'}
              >
                Token
              </Button>
              <Button
                onClick={() => onChangeNFT(true)}
                className={isEqual(isNFT, true) ? '' : 'btn-unselect'}
              >
                NFT
              </Button>
            </Space>
          </Col>
          <Col span={24}>
            <Input
              size="large"
              placeholder={
                !isNFT
                  ? 'Input Token Address'
                  : 'Input NFT collection address or Select'
              }
              value={value}
              className="border-less"
              onChange={(e) => onChange(e.target.value || '')}
              suffix={
                !isNFT ? (
                  <MintSelection
                    value={value}
                    onChange={onChange}
                    style={{ marginRight: -7 }}
                  />
                ) : null
              }
              autoFocus={true}
            />
          </Col>
        </Row>
      </Col>
      {isNFT ? (
        <Col>
          <Button
            style={{
              height: '100px',
              width: '100px',
              whiteSpace: 'break-spaces',
              border: 'none',
            }}
            onClick={() => setVisible(true)}
          >
            Select a NFT collection
          </Button>
          <ModalNftCollection
            visible={visible}
            setVisible={setVisible}
            onSelect={onChange}
          />
        </Col>
      ) : null}
    </Row>
  )
}

export default TokenAddressInput
