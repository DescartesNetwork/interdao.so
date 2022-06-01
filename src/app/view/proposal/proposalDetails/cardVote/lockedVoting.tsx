import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Col, Row, Space, Tooltip, Typography } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { getRemainingTime } from 'app/helpers/countDown'
import useProposal from 'app/hooks/proposal/useProposal'
import useProposalStatus from 'app/hooks/proposal/useProposalStatus'
import { AppState } from 'app/model'
import { numeric } from 'shared/util'

type LockedVotingProps = {
  proposalAddress: string
  daoAddress: string
}

const defaultRemainingTime = {
  minutes: '00',
  hours: '00',
  days: '00',
  seconds: '00',
}

const LockedVoting = ({ proposalAddress, daoAddress }: LockedVotingProps) => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime)
  const { status } = useProposalStatus(proposalAddress)
  const voteAmount = useSelector((state: AppState) => state.voteBid.amount)
  const { endDate, startDate } = useProposal(proposalAddress, daoAddress)

  const voteNow = new Date().getTime()
  const endTime = Number(endDate) * 1000
  const startTime = Number(startDate) * 1000

  const remaining = voteNow < endTime ? endTime - voteNow : 0
  const votePower = (Number(voteAmount) * remaining) / 1000

  const updateRemainingTime = useCallback(
    (countdown: number, startTime?: number) =>
      setRemainingTime(getRemainingTime(countdown, startTime)),
    [],
  )

  useEffect(() => {
    if (status === 'Preparing') return updateRemainingTime(endTime, startTime)
    const intervalId = setInterval(() => {
      updateRemainingTime(endTime)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [endTime, startTime, status, updateRemainingTime])

  return (
    <Row gutter={[16, 16]}>
      <Col flex="auto">
        <Space direction="vertical">
          <Typography.Text>Time remaining</Typography.Text>
          <Typography.Title level={5}>
            {remainingTime.days}d : {remainingTime.hours}h :{' '}
            {remainingTime.minutes}m : {remainingTime.seconds}s
          </Typography.Title>
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Space>
            <Tooltip title="Your power will be equal to the token amount multiplied by the remaining time (by seconds)">
              <IonIcon
                style={{ cursor: 'pointer' }}
                name="information-circle-outline"
              />
            </Tooltip>
            <Typography.Text>Power of your votes</Typography.Text>
          </Space>

          <Typography.Title level={5} style={{ textAlign: 'right' }}>
            {numeric(votePower).format('0,0.[0000]')}
          </Typography.Title>
        </Space>
      </Col>
    </Row>
  )
}

export default LockedVoting
