import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Button,
  Card,
  Col,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Typography,
} from 'antd'
import Header from './header'

import { ProposalInitializeStep } from 'app/constants'
import { AppDispatch, AppState } from 'app/model'
import {
  ProposalDataAction,
  setProposal,
} from 'app/model/proposalAction.controller'

const VoteRule = ({
  step,
  setStep,
}: {
  step: number
  setStep: (step: number) => void
}) => {
  const [consensusMechanism, setConsensusMechanism] =
    useState('StakedTokenCounter')
  const [consensusQuorum, setConsensusQuorum] = useState('Half')
  const dispatch = useDispatch<AppDispatch>()
  const {
    proposalAction: { proposalData },
  } = useSelector((state: AppState) => state)

  const nextStep = () => {
    const params: ProposalDataAction = {
      consensusQuorum,
      consensusMechanism,
    }
    dispatch(setProposal({ proposalParams: params }))
    return setStep(ProposalInitializeStep.review)
  }

  return (
    <Card bordered={false}>
      <Row gutter={[40, 40]}>
        <Col span={24}>
          <Header
            stepValue={ProposalInitializeStep.voteRule}
            label="Vote Rute"
            done={step > ProposalInitializeStep.voteRule}
          />
        </Col>
        {step === ProposalInitializeStep.voteRule && (
          <Col span={24}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Row gutter={[24, 24]}>
                  <Col span={24}>
                    <Space direction="vertical">
                      <Typography.Title level={5}>Quorum</Typography.Title>
                      <Typography.Text>
                        Minimum percentage of Proposal member to paticipage in
                        the vote for it to be valid.
                      </Typography.Text>
                    </Space>
                  </Col>
                  <Col span={24}>
                    <Radio.Group
                      className="consensus"
                      onChange={(e: RadioChangeEvent) =>
                        setConsensusQuorum(e.target.value || 'Half')
                      }
                      value={proposalData?.consensusQuorum || consensusQuorum}
                    >
                      <Radio className="consensus-item" value="OneThird">
                        1/3
                      </Radio>
                      <Radio className="consensus-item" value="Half">
                        1/2
                      </Radio>
                      <Radio className="consensus-item" value="TwoThird">
                        2/3
                      </Radio>
                    </Radio.Group>
                  </Col>
                  <Col span={24}>
                    <Typography.Title level={5}>
                      Consensus mechanism
                    </Typography.Title>
                  </Col>
                  <Col span={24}>
                    <Radio.Group
                      onChange={(e: RadioChangeEvent) =>
                        setConsensusMechanism(
                          e.target.value || 'StakedTokenCounter',
                        )
                      }
                      value={
                        proposalData?.consensusMechanism || consensusMechanism
                      }
                      className="consensus"
                    >
                      <Radio
                        className="consensus-item"
                        value="StakedTokenCounter"
                      >
                        Stake lockcounter
                      </Radio>
                      <Radio
                        className="consensus-item"
                        value="LockedTokenCounter"
                      >
                        Stake no lockcounter
                      </Radio>
                    </Radio.Group>
                  </Col>
                </Row>
              </Col>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Space>
                  <Button
                    onClick={() => setStep(ProposalInitializeStep.proposalInfo)}
                  >
                    Back
                  </Button>
                  <Button
                    disabled={!consensusMechanism || !consensusQuorum}
                    type="primary"
                    onClick={nextStep}
                  >
                    Next
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
export default VoteRule
