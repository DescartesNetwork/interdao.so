import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DaoData } from '@interdao/core'

import { Button, Col, Row } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import ProposalList from './proposalList'
import DaoDetails from '../dao/daoDetails'

import configs from 'app/configs'
import useValidDaoMember from 'app/hooks/dao/useValidDaoMember'
import { AppState } from 'app/model'

import './index.less'

const {
  manifest: { appId },
} = configs

const Proposal = () => {
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
      // return history.push(`/app/${appId}/dao`)
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
              onClick={() => history.push(`/app/${appId}/dao`)}
              style={{ marginLeft: -8 }}
            >
              Back
            </Button>
          </Col>
          <Col span={24}>
            <DaoDetails daoAddress={daoAddress} />
          </Col>
        </Row>
      </Col>
      <Col xs={24} lg={18}>
        <ProposalList daoAddress={daoAddress} />
      </Col>
    </Row>
  )
}

export default Proposal
