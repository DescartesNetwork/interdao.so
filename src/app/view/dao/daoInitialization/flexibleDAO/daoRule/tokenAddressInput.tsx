import { useDispatch, useSelector } from 'react-redux'
import isEqual from 'react-fast-compare'

import { Button, Col, Row, Space, Typography } from 'antd'
import VoteInput from './voteInput'

import { AppDispatch, AppState } from 'app/model'
import { setInitDao } from 'app/model/dao.controller'

import './index.less'

const TokenAddressInput = () => {
  const initDao = useSelector((state: AppState) => state.dao.initDao)
  const dispatch = useDispatch<AppDispatch>()
  const { isNft } = initDao

  const onNftChange = (isNft: boolean) => {
    return dispatch(setInitDao({ ...initDao, isNft, mintAddress: '' }))
  }

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space size={32}>
          <Typography.Text>Vote by</Typography.Text>
          <Space size={12}>
            <Button
              onClick={() => onNftChange(false)}
              className={isEqual(isNft, false) ? '' : 'btn-unselect'}
              size="small"
            >
              Token
            </Button>
            <Button
              onClick={() => onNftChange(true)}
              className={isEqual(isNft, true) ? '' : 'btn-unselect'}
              size="small"
            >
              NFT
            </Button>
          </Space>
        </Space>
      </Col>
      <Col span={24}>
        <VoteInput />
      </Col>
    </Row>
  )
}

export default TokenAddressInput
