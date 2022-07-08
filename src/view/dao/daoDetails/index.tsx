import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { Col, Row } from 'antd'
import DaoInfo from './daoInfo'
import JoinDao from './joinDao'
import DaoOwnerAssets from './daoOwnerAssets'

import { AppState } from 'model'
import configs from 'configs'
import useDaoNameUrl from 'hooks/dao/useDaoNameUrl'

import './index.less'

const {
  manifest: { appId },
} = configs

export type DaoDetailsProps = { daoAddress: string }
const DaoDetails = ({ daoAddress }: DaoDetailsProps) => {
  const daos = useSelector((state: AppState) => state.daos)
  const history = useHistory()
  const { daoName } = useParams<{ daoName: string }>()
  const { daoNameUrl } = useDaoNameUrl(daoAddress)

  const checkValidDaoAddress = useCallback(() => {
    if (daoNameUrl === undefined) return
    if (!daos[daoAddress] || daoName !== daoNameUrl) {
      console.log('checkValidDaoAddress')
      return history.push(`/app/${appId}/page-not-found`)
    }
  }, [daoAddress, daoName, daoNameUrl, daos, history])

  useEffect(() => {
    checkValidDaoAddress()
  }, [checkValidDaoAddress])

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
