import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import isEqual from 'react-fast-compare'

import { Button, Col, Input, Row, Space, Typography } from 'antd'
import ModalNftCollection from '../../components/modalNftCollection'

import { MintSelection } from 'shared/antd/mint'
import { AppDispatch, AppState } from 'app/model'
import { setInitDao } from 'app/model/dao.controller'

import './index.less'

const TokenAddressInput = () => {
  const [visible, setVisible] = useState(false)
  const initDao = useSelector((state: AppState) => state.dao.initDao)
  const dispatch = useDispatch<AppDispatch>()
  const { isNft, mintAddress } = initDao

  const onNftChange = (isNft: boolean) => {
    return dispatch(setInitDao({ ...initDao, isNft }))
  }

  const onMintAddressChange = (mintAddress: string) => {
    return dispatch(setInitDao({ ...initDao, mintAddress }))
  }

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
                onClick={() => onNftChange(false)}
                className={isEqual(isNft, false) ? '' : 'btn-unselect'}
              >
                Token
              </Button>
              <Button
                onClick={() => onNftChange(true)}
                className={isEqual(isNft, true) ? '' : 'btn-unselect'}
              >
                NFT
              </Button>
            </Space>
          </Col>
          <Col span={24}>
            <Input
              size="large"
              placeholder={
                !isNft
                  ? 'Input Token Address'
                  : 'Input NFT collection address or Select'
              }
              value={mintAddress}
              className="border-less"
              onChange={(e) =>
                dispatch(
                  setInitDao({ ...initDao, mintAddress: e.target.value }),
                )
              }
              suffix={
                !isNft && (
                  <MintSelection
                    value={mintAddress}
                    onChange={onMintAddressChange}
                    style={{ marginRight: -7 }}
                  />
                )
              }
              autoFocus={true}
            />
          </Col>
        </Row>
      </Col>
      {isNft && (
        <Col>
          <ModalNftCollection
            visible={visible}
            setVisible={setVisible}
            onSelect={onMintAddressChange}
          />
        </Col>
      )}
    </Row>
  )
}

export default TokenAddressInput
