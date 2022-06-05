import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Col, Row } from 'antd'
import DaoInfo from './daoInfo'
import JoinDao from './joinDao'
import DaoOwnerAssets from './daoOwnerAssets'
import useCheckMemberOnly from 'app/hooks/dao/useCheckMemberOnly'
import configs from 'app/configs'

import './index.less'

export type DaoDetailsProps = { daoAddress: string }
const {
  manifest: { appId },
} = configs

const DaoDetails = ({ daoAddress }: DaoDetailsProps) => {
  const { isMemberOnly } = useCheckMemberOnly(daoAddress)
  const history = useHistory()

  useEffect(() => {
    if (!isMemberOnly) {
      return history.push(`/app/${appId}/dao`)
    }
  }, [daoAddress, history, isMemberOnly])

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={16}>
        <DaoInfo daoAddress={daoAddress} />
      </Col>
      <Col xs={24} md={8}>
        <DaoOwnerAssets daoAddress={daoAddress} />
      </Col>
      <JoinDao daoAddress={daoAddress} />
    </Row>
  )
}

export default DaoDetails
