import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Col, Row } from 'antd'

import { validURL } from 'helpers'

import { AppDispatch, AppState } from 'model'
import {
  DaoMetaData,
  revertPrevStep,
  submitStepDaoDetail,
} from 'model/createDao.controller'
import FormInputDetail from '../../../components/formInputDetail'

const DaoInputDetails = () => {
  const defaultMetadata = useSelector(
    (state: AppState) => state.createDao.data.metadata,
  )
  const [metadata, setMetadata] = useState<DaoMetaData>(defaultMetadata)
  const dispatch = useDispatch<AppDispatch>()

  const validLink = useMemo(() => {
    const { optionals } = metadata
    if (!optionals.length) return true
    for (const link of optionals) if (!validURL(link)) return false
    return true
  }, [metadata])

  const disabled = useMemo(() => {
    const { daoName, description, image } = metadata
    return !daoName || !description || !image || !validLink
  }, [metadata, validLink])

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <FormInputDetail metadata={metadata} setMetadata={setMetadata} />
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
            <Button
              type="primary"
              size="large"
              disabled={disabled}
              onClick={() => dispatch(submitStepDaoDetail({ metadata }))}
            >
              Continue
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default DaoInputDetails
