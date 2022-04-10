import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { SystemProgram } from '@solana/web3.js'
import moment from 'moment'
import BN from 'bn.js'

import { Card, Col, Row, Space, Typography } from 'antd'
import GradientAvatar from 'app/components/gradientAvatar'
import ProposalStatus, {
  ProposalStatusType,
} from 'app/components/proposalStatus'

import { shortenAddress } from 'shared/util'
import { AppState } from 'app/model'
import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

export type ProposalCardProps = { proposalAddress: string }

const currentDate = Math.floor(Number(new Date()) / 1000)

const ProposalCard = ({ proposalAddress }: ProposalCardProps) => {
  const history = useHistory()
  const { proposal } = useSelector((state: AppState) => state)
  const { dao, startDate, endDate } = proposal[proposalAddress] || {
    dao: SystemProgram.programId,
    startDate: new BN(currentDate),
    endDate: new BN(currentDate),
  }

  let status: ProposalStatusType = useMemo(() => {
    if (currentDate < Number(startDate)) return 'Preparing'
    if (currentDate < Number(endDate)) return 'Voting'
    return 'Completed'
  }, [startDate, endDate])

  return (
    <Card
      bordered={false}
      onClick={() =>
        history.push(
          `/app/${appId}/dao/${dao.toBase58()}/proposal/${proposalAddress}`,
        )
      }
      hoverable
    >
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[16, 16]} wrap={false} align="middle">
            <Col>
              <GradientAvatar seed={proposalAddress} />
            </Col>
            <Col flex="auto">
              <Row>
                <Col span={24}>
                  <Row>
                    <Col flex="auto">
                      <Typography.Title level={5}>
                        {shortenAddress(proposalAddress)}
                      </Typography.Title>
                    </Col>
                    <Col>
                      <ProposalStatus status={status} />
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Space>
                    <Typography.Text className="caption" type="secondary">
                      End Date:
                    </Typography.Text>
                    <Typography.Text className="caption">
                      {moment(Number(endDate) * 1000).format(
                        'hh:mm A, MMM Do, YYYY',
                      )}
                    </Typography.Text>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Typography.Paragraph type="secondary" ellipsis={{ rows: 2 }}>
            Lorem ipsum, sem, vulputate fusce magna non mattis, diam auctor,
            commodo risus. Lorem ipsum, sem, vulputate fusce magna non mattis,
            diam auctor, commodo risus. Lorem ipsum, sem, vulputate fusce magna
            non mattis, diam auctor, commodo risus. Lorem ipsum, sem, vulputate
            fusce magna non mattis, diam auctor, commodo risus.
          </Typography.Paragraph>
        </Col>
      </Row>
    </Card>
  )
}

export default ProposalCard
