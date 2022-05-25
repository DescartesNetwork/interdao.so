import { useDispatch, useSelector } from 'react-redux'
import BN from 'bn.js'

import { Col, Row } from 'antd'
import RegimeInput from './regimeInput'
import CirculatingSupplyInput from './circulatingSupplyInput'
import TokenAddressInput from './tokenAddressInput'
import { AppDispatch, AppState } from 'app/model'
import { setInitDao } from 'app/model/dao.controller'

import './index.less'

const DaoRule = () => {
  const {
    dao: { initDao },
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch<AppDispatch>()

  const { mintAddress, supply, regime } = initDao

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
          onChange={(mintAddress) =>
            dispatch(setInitDao({ ...initDao, mintAddress }))
          }
        />
      </Col>
      <Col span={24}>
        <CirculatingSupplyInput
          mintAddress={mintAddress}
          value={supply?.toString()}
          onChange={(supply) =>
            dispatch(setInitDao({ ...initDao, supply: new BN(supply) }))
          }
        />
      </Col>
    </Row>
  )
}

export default DaoRule
