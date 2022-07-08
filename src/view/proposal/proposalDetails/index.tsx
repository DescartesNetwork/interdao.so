import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { Button, Col, Row, Spin } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import CardStatus from './cardStatus'
import CardVote from './cardVote'
import CardInfo from './cardInfo'
import CardProgress from './cardProgress'
import History from './history'
import Comments from '../components/comments'

import { AppState } from 'model'
import configs from 'configs'
import useProposalMetaData from 'hooks/proposal/useProposalMetaData'

import './index.less'

const {
  manifest: { appId },
} = configs

export type ProposalChildCardProps = {
  proposalAddress: string
  daoAddress: string
}

const ProposalDetails = () => {
  const history = useHistory()
  const { proposalAddress, daoAddress } = useParams<{
    daoAddress: string
    proposalAddress: string
  }>()
  const { loading } = useProposalMetaData(proposalAddress)
  const proposal = useSelector((state: AppState) => state.proposal)

  const checkValidProposalAddress = useCallback(() => {
    if (!proposal[proposalAddress])
      return history.push(`/app/${appId}/page-not-found`)
  }, [proposalAddress, proposal, history])

  useEffect(() => {
    checkValidProposalAddress()
  }, [checkValidProposalAddress])

  return (
    <Spin spinning={loading} tip="Loading Proposal Data...">
      <Row justify="center">
        <Col xs={24} lg={18}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Button
                type="text"
                icon={<IonIcon name="arrow-back-outline" />}
                onClick={() => history.push(`/app/${appId}/dao/${daoAddress}`)}
              >
                Back
              </Button>
            </Col>
            <Col span={24}>
              <Row gutter={[24, 24]}>
                <Col xs={24} md={16}>
                  <Row gutter={[24, 24]}>
                    <Col span={24}>
                      <CardStatus
                        proposalAddress={proposalAddress}
                        daoAddress={daoAddress}
                      />
                    </Col>

                    <Col span={24}>
                      <CardVote
                        proposalAddress={proposalAddress}
                        daoAddress={daoAddress}
                      />
                    </Col>
                    <Col span={24}>
                      <Comments proposalAddress={proposalAddress} />
                    </Col>
                    <Col span={24}>
                      <History
                        proposalAddress={proposalAddress}
                        daoAddress={daoAddress}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={8}>
                  <Row gutter={[24, 24]}>
                    <Col span={24}>
                      <CardInfo
                        proposalAddress={proposalAddress}
                        daoAddress={daoAddress}
                      />
                    </Col>
                    <Col span={24}>
                      <CardProgress
                        proposalAddress={proposalAddress}
                        daoAddress={daoAddress}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Spin>
  )
}
export default ProposalDetails
