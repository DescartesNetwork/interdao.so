import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DaoRegimes } from '@interdao/core'

import { Col, Row, Typography } from 'antd'
import CardRegime from '../../components/cardRegime'

import { AppDispatch, AppState } from 'app/model'
import { setInitDao } from 'app/model/daos.controller'

const Regime = () => {
  const {
    daos: { initDao },
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const { regime } = initDao

  useEffect(() => {
    if (regime === DaoRegimes.Autonomous) return
    dispatch(setInitDao({ ...initDao, regime: DaoRegimes.Autonomous }))
  }, [initDao, dispatch, regime])

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text>DAO Regime</Typography.Text>
      </Col>
      <Col xs={24} md={8}>
        <CardRegime
          value={DaoRegimes.Autonomous}
          regime={DaoRegimes.Autonomous}
        />
      </Col>
    </Row>
  )
}

export default Regime
