import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DaoData } from '@interdao/core'

import { Button, Col, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import DaoInfo from 'view/daoDetails/daoInfo'
import DaoOwnerAssets from 'view/daoDetails/daoOwnerAssets'
import ProposalList from 'view/proposalList'

import useValidDaoMember from 'hooks/dao/useValidDaoMember'
import { AppState } from 'model'
import { APP_ROUTE } from 'configs/route'
import './index.less'

const DaoDetails = () => {
  const history = useHistory()
  const { daoAddress } = useParams<{ daoAddress: string }>()
  const daoData = useSelector((state: AppState) => state.daos[daoAddress])
  const { isPublic } = daoData || ({} as DaoData)
  const { validMember, checking } = useValidDaoMember(daoAddress)

  useEffect(() => {
    if (checking) return
    if (!validMember && !isPublic) {
      window.notify({
        type: 'warning',
        description: 'You are not a member of this DAO',
      })
      return history.push(APP_ROUTE.listDaos.generatePath({}))
    }
  }, [checking, daoAddress, history, isPublic, validMember])

  return (
    <Row gutter={[24, 24]} justify="center" align="middle">
      <Col xs={24} lg={18}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Button
              icon={<IonIcon name="arrow-back-outline" />}
              type="text"
              onClick={() => history.push(APP_ROUTE.listDaos.generatePath({}))}
              style={{ marginLeft: -8 }}
            >
              Back
            </Button>
          </Col>
          <Col span={24}>
            <Row gutter={[24, 24]}>
              <Col xs={24} md={16}>
                <DaoInfo daoAddress={daoAddress} />
              </Col>
              <Col xs={24} md={8}>
                <DaoOwnerAssets daoAddress={daoAddress} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col xs={24} lg={18}>
        <ProposalList daoAddress={daoAddress} />
      </Col>
    </Row>
  )
}

export default DaoDetails
