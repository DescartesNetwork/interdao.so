import { useDispatch } from 'react-redux'

import { Button, Col, Row } from 'antd'
import FlexibleDaoReview from './flexibleDaoReview'

import { AppDispatch } from 'model'
import { revertPrevStep } from 'model/createDao.controller'
import ConfirmButton from './confirmButton'

const Review = () => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <FlexibleDaoReview />
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
