import { DaoData } from '@interdao/core'
import { utils } from '@senswap/sen-js'
import { Button, Card, Col, Row, Typography, Input, Space } from 'antd'
import useProposal from 'app/hooks/useProposal'
import { AppState } from 'app/model'
import { setVoteBidAmount } from 'app/model/voteBid.controller'
import moment from 'moment'
import { Fragment, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IonIcon from 'shared/antd/ionicon'
import useMintDecimals from 'shared/hooks/useMintDecimals'

import { ProposalChildCardProps } from './index'
type LockedVotingProps = {
  proposalAddress: string
  daoAddress: string
}
const LockedVoting = ({ proposalAddress, daoAddress }: LockedVotingProps) => {
  const {
    voteBid: { amount: voteAmount },
  } = useSelector((state: AppState) => state)
  const { consensusMechanism, endDate } = useProposal(
    proposalAddress,
    daoAddress,
  )
  const voteNow = new Date().getTime()
  const endTime = Number(endDate)
  const isLockedVote =
    Object.keys(consensusMechanism || [])?.[0] === 'lockedTokenCounter'
  const remaining = voteNow > endTime ? voteNow - endTime : 0

  if (!isLockedVote) return <Fragment />

  return (
    <Row gutter={[16, 16]}>
      <Col flex="auto">
        <Space direction="vertical">
          <Typography.Text>Time remaining</Typography.Text>
          <Typography.Title level={5}>
            {moment(Number(endDate), 'YYYYMMDD').fromNow()}
          </Typography.Title>
        </Space>
      </Col>
      <Col>
        <Space direction="vertical">
          <Typography.Text>Power of your vote</Typography.Text>
          <Typography.Title level={5}>{}</Typography.Title>
        </Space>
      </Col>
    </Row>
  )
}

const CardVote = ({ proposalAddress, daoAddress }: ProposalChildCardProps) => {
  const { dao } = useSelector((state: AppState) => state)
  const dispatch = useDispatch()
  const { mint } = dao[daoAddress] || ({} as DaoData)
  const mintDecimal = useMintDecimals(mint.toBase58())

  const onChange = useCallback(
    (value: string) => {
      if (!value || !mintDecimal) return

      const voteAmount = utils.decimalize(value, mintDecimal)
      dispatch(setVoteBidAmount(voteAmount))
    },
    [dispatch, mintDecimal],
  )

  return (
    <Card bordered={false}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Typography.Title level={5}>Cast your vote</Typography.Title>
        </Col>
        <Col span={12}>
          <Button
            className="voting-btn"
            style={{ borderRadius: 4, border: 'none' }}
            icon={<IonIcon name="thumbs-up-outline" />}
            block
          >
            Yes
          </Button>
        </Col>
        <Col span={12}>
          <Button
            style={{ borderRadius: 4, border: 'none', background: '#E9E9EB' }}
            icon={<IonIcon name="thumbs-down-outline" />}
            block
          >
            No
          </Button>
        </Col>
        <Col span={24}>
          <Card
            style={{ boxShadow: 'unset', borderRadius: 8 }}
            bodyStyle={{ padding: 8 }}
          >
            <Row gutter={[8, 8]}>
              <Col flex="auto">
                <Typography.Text>Amount vote</Typography.Text>
              </Col>
              <Col>
                <Typography.Text>Available: {0}</Typography.Text>
              </Col>
              <Col span={24}>
                <Input
                  bordered={false}
                  style={{ padding: 0 }}
                  placeholder="0"
                  onChange={(e) => onChange(e.target.value)}
                  suffix={
                    <Button size="small" type="text">
                      Max
                    </Button>
                  }
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <LockedVoting
            proposalAddress={proposalAddress}
            daoAddress={daoAddress}
          />
        </Col>
        <Col span={24}>
          <Button type="primary" disabled block>
            Vote
          </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default CardVote
