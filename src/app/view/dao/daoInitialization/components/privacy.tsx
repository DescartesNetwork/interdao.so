import { useDispatch, useSelector } from 'react-redux'
import isEqual from 'react-fast-compare'

import { Button, Col, Row, Typography } from 'antd'
import { AppDispatch, AppState } from 'app/model'
import { setInitDao } from 'app/model/dao.controller'

const Privacy = () => {
  const initDao = useSelector((state: AppState) => state.dao.initDao)
  const { isPublic } = initDao
  const dispatch = useDispatch<AppDispatch>()

  const handleClick = (isPublic: boolean) => {
    return dispatch(setInitDao({ ...initDao, isPublic }))
  }
  return (
    <Row gutter={[12, 12]}>
      <Col span={24}>
        <Typography.Text>DAO privacy</Typography.Text>
      </Col>
      <Col>
        <Button
          onClick={() => handleClick(false)}
          className={isEqual(isPublic, false) ? '' : 'btn-unselect'}
          block
        >
          Member Only
        </Button>
      </Col>
      <Col>
        <Button
          onClick={() => handleClick(true)}
          className={isEqual(isPublic, true) ? '' : 'btn-unselect'}
          block
        >
          Public
        </Button>
      </Col>
    </Row>
  )
}

export default Privacy
