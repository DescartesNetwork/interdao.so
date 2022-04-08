import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { Button, Card, Col, Progress, Row, Space, Typography } from 'antd'
import { AppState } from 'app/model'
import IonIcon from 'shared/antd/ionicon'

import configs from 'app/configs'

const {
  manifest: { appId },
} = configs

const VotingCard = ({
  proposalAddress,
  isVoteFor = false,
}: {
  proposalAddress: string
  isVoteFor?: boolean
}) => {
  const { proposal } = useSelector((state: AppState) => state)
  const { votingForPower, votingAgainstPower, supply } =
    proposal[proposalAddress] || {}
  const totalPower = Number(supply)
  const voteForPower = Number(votingForPower)
  const voteAgainstPower = Number(votingAgainstPower)
  const voteForPercentage = totalPower ? (voteForPower / totalPower) * 100 : 0
  const voteAgainstPercentage = totalPower
    ? (voteAgainstPower / totalPower) * 100
    : 0

  const votePercentage = isVoteFor ? voteForPercentage : voteAgainstPercentage

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Progress
            percent={100}
            strokeColor={!votePercentage ? '#dadada' : '#F9575E'}
            showInfo={false}
            success={{ percent: votePercentage, strokeColor: '#63E0B3' }}
          />
        </Col>
      </Row>
    </Card>
  )
}

const ProposalDetails = () => {
  const history = useHistory()
  const { proposalAddress, daoAddress } =
    useParams<{ daoAddress: string; proposalAddress: string }>()
  const { proposal } = useSelector((state: AppState) => state)
  const { supply } = proposal[proposalAddress] || {}
  console.log(supply)

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Button
          type="text"
          icon={<IonIcon name="arrow-back-outline" />}
          onClick={() => history.push(`/app/${appId}/dao/${daoAddress}`)}
        />
      </Col>
      <Col span={24}>
        <Card bordered={false} style={{ boxShadow: 'unset' }}>
          <Row gutter={[24, 24]}>
            <Col span={16}>
              <Row gutter={[24, 24]}>
                <Col span={24}>
                  <Typography.Title level={4}>NFT Oder</Typography.Title>
                </Col>
                <Col span={24}>
                  <Typography.Text>
                    The v3 proposal concerns a major update to 0x protocol. The
                    upgrades fall mainly into three buckets: the introduction of
                    staking contracts, a new pattern supporting bridged
                    liquidity across the DeFi ecosystem, and miscellaneous
                    technical improvements. A ZRX staking mechanism grants 0x
                    market makers greater ownership in the protocol and
                    encourages participation in governance by distributing
                    monetary rewards (in ether) and additional voting power for
                    providing liquidity. 0x v3 also introduces a powerful set of
                    bridge contracts that aggregate liquidity from multiple
                    sources including DEXs like Uniswap, Kyber, and Oasis. Learn
                    More
                  </Typography.Text>
                </Col>
                <Col span={24}>
                  <Space>
                    <Typography.Title level={4}>Voting</Typography.Title>
                    <Typography.Text>
                      ({'(6,608,613 ZRX total vote)'})
                    </Typography.Text>
                  </Space>
                </Col>
                <Col xs={24} lg={12}>
                  <VotingCard proposalAddress={proposalAddress} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}
export default ProposalDetails
