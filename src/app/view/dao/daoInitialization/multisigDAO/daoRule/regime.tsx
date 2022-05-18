import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DaoRegimes } from '@interdao/core'

import { Col, Row, Typography } from 'antd'
import CardRegime from '../../components/cardRegime'

import { AppDispatch, AppState } from 'app/model'
import { setCreateDaoData } from 'app/model/dao.controller'

const Regime = () => {
  const {
    dao: { createDaoData },
  } = useSelector((state: AppState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const { regime } = createDaoData

  useEffect(() => {
    if (regime === DaoRegimes.Autonomous) return
    dispatch(
      setCreateDaoData({ ...createDaoData, regime: DaoRegimes.Autonomous }),
    )
  }, [createDaoData, dispatch, regime])

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