import { useCallback, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { Button, Col, Row, Spin } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import CardStatus from './cardStatus'
import CardVote from './cardVote'
import CardInfo from './cardInfo'
import CardProgress from './cardProgress'
import History from './history'
import Comments from '../proposalList/components/comments'

import useProposalMetaData from 'hooks/proposal/useProposalMetaData'

import './index.less'
import useProposal from 'hooks/proposal/useProposal'
import { APP_ROUTE } from 'configs/route'

export type ProposalChildCardProps = {
  proposalAddress: string
  daoAddress: string
}

const ProposalDetails = () => {
  const history = useHistory()
  const { proposalAddress } = useParams<{
    proposalAddress: string
  }>()
  const proposalData = useProposal(proposalAddress)
  const { loading } = useProposalMetaData(proposalAddress)

  const daoAddress = proposalData?.dao?.toBase58()

  const checkValidProposalAddress = useCallback(() => {
    if (!proposalData) {
      return history.push(APP_ROUTE.notFound.generatePath({}))
    }
  }, [proposalData, history])

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
                onClick={() => {
                  const listDaoRoute = APP_ROUTE.daoDetails.generatePath({
                    daoAddress,
                  })
                  return history.push(listDaoRoute)
                }}
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
                      <History proposalAddress={proposalAddress} />
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
