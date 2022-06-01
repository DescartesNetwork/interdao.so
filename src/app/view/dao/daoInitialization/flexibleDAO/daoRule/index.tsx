import { useDispatch, useSelector } from 'react-redux'

import { Col, Row } from 'antd'
import RegimeInput from './regimeInput'
import CirculatingSupply from '../circulatingSupply'
import TokenAddressInput from './tokenAddressInput'
import Privacy from './privacy'

import { AppDispatch, AppState } from 'app/model'
import { setInitDao } from 'app/model/dao.controller'

import './index.less'

const DaoRule = () => {
  const initDao = useSelector((state: AppState) => state.dao.initDao)
  const dispatch = useDispatch<AppDispatch>()

  const { mintAddress, regime, isPublic, isNft } = initDao

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <RegimeInput
          value={regime}
          onChange={(regime) => dispatch(setInitDao({ ...initDao, regime }))}
        />
      </Col>
      <Col span={24}>
        <TokenAddressInput
          value={mintAddress}
          isNFT={isNft}
          onChange={(mintAddress) =>
            dispatch(setInitDao({ ...initDao, mintAddress }))
          }
          onChangeNFT={(isNft) => {
            dispatch(setInitDao({ ...initDao, isNft }))
          }}
        />
      </Col>
      <Col span={24}>
        <CirculatingSupply />
      </Col>
      <Col span={24}>
        <Privacy
          isPublic={isPublic}
          onChange={(isPublic) => {
            dispatch(setInitDao({ ...initDao, isPublic }))
          }}
        />
      </Col>
    </Row>
  )
}

export default DaoRule
