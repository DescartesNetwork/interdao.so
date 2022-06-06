import { useDispatch, useSelector } from 'react-redux'

import { Col, Row, Input } from 'antd'
import { MintSelection } from 'shared/antd/mint'

import { setInitDao } from 'app/model/dao.controller'
import { AppDispatch, AppState } from 'app/model'

const VoteTokenInput = () => {
  const initDao = useSelector((state: AppState) => state.dao.initDao)
  const dispatch = useDispatch<AppDispatch>()
  const { mintAddress } = initDao

  const onMintAddressChange = (mintAddress: string) => {
    return dispatch(setInitDao({ ...initDao, mintAddress }))
  }

  return (
    <Col flex={1}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Input
            size="large"
            placeholder={'Input Token Address'}
            value={mintAddress}
            className="border-less"
            onChange={(e) =>
              dispatch(setInitDao({ ...initDao, mintAddress: e.target.value }))
            }
            suffix={
              <MintSelection
                value={mintAddress}
                onChange={onMintAddressChange}
                style={{ marginRight: -7 }}
              />
            }
            autoFocus={true}
          />
        </Col>
      </Row>
    </Col>
  )
}

export default VoteTokenInput
