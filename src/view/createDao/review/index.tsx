import { useDispatch, useSelector } from 'react-redux'

import { Button, Col, Row } from 'antd'
import FlexibleDaoReview from './flexibleDaoReview'
import MultisigDAOReview from './multisigDaoReview'

import { AppDispatch, AppState } from 'model'
import { revertPrevStep } from 'model/createDao.controller'
import ConfirmButton from './confirmButton'

const Review = () => {
  const daoType = useSelector(
    (state: AppState) => state.createDao.data.metadata.daoType,
  )
  const dispatch = useDispatch<AppDispatch>()

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        {daoType === 'flexible-dao' ? (
          <FlexibleDaoReview />
        ) : (
          <MultisigDAOReview />
        )}
      </Col>
      <Col span={24}>
        <Row>
          <Col flex="auto">
            <Button
              type="text"
              size="large"
              onClick={() => dispatch(revertPrevStep())}
            >
              Back
            </Button>
          </Col>
          <Col>
            <ConfirmButton />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Review
