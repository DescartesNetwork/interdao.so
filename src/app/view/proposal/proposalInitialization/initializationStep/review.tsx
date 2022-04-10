import { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { account } from '@senswap/sen-js'
import moment from 'moment'
import { BN } from 'bn.js'
import { ConsensusMechanisms, ConsensusQuorums } from '@interdao/core'
import { useWallet } from '@senhub/providers'

import { Button, Card, Col, Row, Space, Typography } from 'antd'
import Header from './header'

import { ProposalInitializeStep } from 'app/constants'
import { AppState } from 'app/model'
import configs from 'app/configs'
import { explorer } from 'shared/util'
import ConsensusMechanismTag from 'app/components/consensusMechanismTag'

const Review = ({
  step,
  setStep,
}: {
  step: number
  setStep: (step: number) => void
}) => {
  const [loading, setLoading] = useState(false)
  const {
    proposalAction: { proposalData },
  } = useSelector((state: AppState) => state)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const valid = useMemo(() => {
    if (!proposalData) return false
    const { daoAddress, startDate, endDate } = proposalData
    if (!account.isAddress(daoAddress)) return false
    if (!startDate || !endDate || startDate >= endDate) return false
    return true
  }, [proposalData])

  const newProposal = useCallback(async () => {
    if (!valid || !proposalData) return
    const {
      daoAddress,
      startDate,
      endDate,
      consensusMechanism,
      consensusQuorum,
    } = proposalData

    if (
      !daoAddress ||
      !startDate ||
      !endDate ||
      !consensusMechanism ||
      !consensusQuorum
    )
      return

    const {
      sol: { interDao },
    } = configs
    try {
      setLoading(true)
      const { txId } = await interDao.initializeProposal(
        daoAddress,
        daoAddress, // invokedProgramAddress
        Buffer.from([]), // data
        [], // pubkeys
        [], // isSigners
        [], // isWritables
        [], // isMasters
        startDate,
        endDate,
        new BN(10 ** 6), // fee
        walletAddress, // taxman
        ConsensusMechanisms[consensusMechanism],
        ConsensusQuorums[consensusQuorum],
      )
      window.notify({
        type: 'success',
        description: 'A new DAO is created. Click here to view details.',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
    } catch (er: any) {
      return window.notify({
        type: 'error',
        description: er.message,
      })
    } finally {
      return setLoading(false)
    }
  }, [proposalData, valid, walletAddress])

  return (
    <Card bordered={false}>
      <Row gutter={[40, 40]}>
        <Col span={24}>
          <Header
            stepValue={ProposalInitializeStep.review}
            label="Preview your proposal"
            done={step > ProposalInitializeStep.review}
          />
        </Col>
        {step === ProposalInitializeStep.review && (
          <Col span={24}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Row>
                  <Col flex="auto">
                    <Space direction="vertical">
                      <Typography.Title level={5}>
                        Title Proposal
                      </Typography.Title>
                      <Typography.Text>{proposalData?.title}</Typography.Text>
                    </Space>
                  </Col>
                  <Col>
                    <Space direction="vertical">
                      <Typography.Title level={5}>
                        Consensus mechanism
                      </Typography.Title>
                      <ConsensusMechanismTag
                        consensusMechanism={
                          proposalData?.consensusMechanism || ''
                        }
                      />
                    </Space>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Space direction="vertical">
                  <Typography.Title level={5}>
                    Consensus mechanism
                  </Typography.Title>
                  <Typography.Text>{proposalData?.description}</Typography.Text>
                </Space>
              </Col>
              <Col span={24}>
                <Space direction="vertical">
                  <Typography.Title level={5}>File import</Typography.Title>
                  <Link to="hub.sentre.io">{proposalData?.link}</Link>
                </Space>
              </Col>
              <Col span={24}>
                <Space direction="vertical">
                  <Typography.Title level={5}>Quorum</Typography.Title>
                  <Typography.Text>
                    {proposalData?.consensusQuorum}
                  </Typography.Text>
                </Space>
              </Col>
              <Col span={24}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Typography.Title level={5}>Voting period</Typography.Title>
                  <Card bordered={false} style={{ background: '#E6E8EB' }}>
                    <Row justify="space-between">
                      <Col>
                        <Space direction="vertical">
                          <Typography.Title level={5}>
                            Start time
                          </Typography.Title>
                          <Typography.Text>
                            {moment(
                              Number(new Date(proposalData?.startDate || 0)) *
                                1000,
                            ).format('DD-MM-YYYY HH:mm')}
                          </Typography.Text>
                        </Space>
                      </Col>
                      <Col>
                        <Space direction="vertical">
                          <Typography.Title level={5}>
                            End time
                          </Typography.Title>
                          <Typography.Text>
                            {moment(
                              Number(new Date(proposalData?.endDate || 0)) *
                                1000,
                            ).format('DD-MM-YYYY HH:mm')}
                          </Typography.Text>
                        </Space>
                      </Col>
                      <Col>
                        <Space direction="vertical">
                          <Typography.Title level={5}>
                            Duration
                          </Typography.Title>
                          <Typography.Text>2 Days</Typography.Text>
                        </Space>
                      </Col>
                    </Row>
                  </Card>
                </Space>
              </Col>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Space>
                  <Button
                    onClick={() => setStep(ProposalInitializeStep.voteRule)}
                  >
                    Back
                  </Button>
                  <Button
                    loading={loading}
                    onClick={newProposal}
                    type="primary"
                  >
                    Complete
                  </Button>
                </Space>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </Card>
  )
}

export default Review
