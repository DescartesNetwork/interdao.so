import { useDispatch, useSelector } from 'react-redux'
import { ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  Card,
  Col,
  Row,
  Typography,
  Input,
  Space,
  Button,
  DatePicker,
} from 'antd'
import Header from './header'

import {
  ProposalDataAction,
  setProposal,
} from 'app/model/proposalAction.controller'
import { AppDispatch, AppState } from 'app/model'
import { ProposalInitializeStep } from 'app/constants'

const WIDTH = {
  width: '100%',
}

const ProposalInfo = ({
  step,
  setStep,
}: {
  step: number
  setStep: (step: number) => void
}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const { daoAddress } = useParams<{ daoAddress: string }>()
  const {
    proposalAction: { proposalData },
  } = useSelector((state: AppState) => state)

  const nextStep = () => {
    const params: ProposalDataAction = {
      title,
      description,
      link,
      startDate: Math.floor(Number(new Date(startDate)) / 1000) || 0,
      endDate: Math.floor(Number(new Date(endDate)) / 1000) || 0,
      daoAddress,
    }
    dispatch(setProposal({ proposalParams: params }))
    return setStep(ProposalInitializeStep.voteRule)
  }

  return (
    <Card bordered={false}>
      <Row gutter={[40, 40]}>
        <Col span={24}>
          <Header
            stepValue={ProposalInitializeStep.proposalInfo}
            label="Proposal information"
            done={step > ProposalInitializeStep.proposalInfo}
          />
        </Col>
        {step === ProposalInitializeStep.proposalInfo && (
          <Col span={24}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Typography.Text>
                  Give your proposal a title and description. They will pulic
                  when your proposal goes live!
                </Typography.Text>
              </Col>
              <Col span={24}>
                <Typography.Title level={5}>Title</Typography.Title>
              </Col>
              <Col span={24}>
                <Input
                  value={proposalData?.title || title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                />
              </Col>
              <Col span={24}>
                <Typography.Title level={5}>Description</Typography.Title>
              </Col>
              <Col span={24}>
                <Input
                  value={proposalData?.description || description}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setDescription(e.target.value)
                  }
                />
              </Col>
              <Col span={24}>
                <Typography.Title level={5}>
                  Upload file (more description)
                </Typography.Title>
              </Col>
              <Col span={24}>
                <Space direction="vertical" style={WIDTH}>
                  <Typography.Text>Add a link (option)</Typography.Text>
                  <Row>
                    <Col flex="auto">
                      <Input
                        value={proposalData?.link || link}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setLink(e.target.value)
                        }
                        placeholder="Enter the link"
                      />
                    </Col>
                    <Col>
                      <Button type="text">OK</Button>
                    </Col>
                  </Row>
                </Space>
              </Col>
              <Col span={24}>
                <Row gutter={40}>
                  <Col span={12}>
                    <Space direction="vertical" style={WIDTH}>
                      <Typography.Text>Start time</Typography.Text>
                      <DatePicker
                        style={WIDTH}
                        onChange={(_, values) => setStartDate(values)}
                        showTime
                      />
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space direction="vertical" style={WIDTH}>
                      <Typography.Text>End time</Typography.Text>
                      <DatePicker
                        style={WIDTH}
                        onChange={(_, values) => setEndDate(values)}
                        showTime
                      />
                    </Space>
                  </Col>
                </Row>
              </Col>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button
                  disabled={!startDate || !endDate}
                  type="primary"
                  onClick={nextStep}
                >
                  Next
                </Button>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </Card>
  )
}

export default ProposalInfo
