import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { account } from '@senswap/sen-js'
import { DaoData } from '@interdao/core'
import { SystemProgram } from '@solana/web3.js'

import { Col, Divider, Row, Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import GradientAvatar from 'app/components/gradientAvatar'
import StatisticCard from 'app/components/statisticCard'
import RegimeTag from 'app/components/regimeTag'

import configs from 'app/configs'
import { AppState } from 'app/model'
import { numeric, shortenAddress } from 'shared/util'
import useMembers from 'app/hooks/useMembers'

const {
  sol: { interDao },
} = configs

export type ProposalPreviewProps = {
  daoAddress: string
}

const ProposalPreview = ({ daoAddress }: ProposalPreviewProps) => {
  const [proposalAddress, setProposalAddress] = useState('')
  const {
    dao: { daoData },
  } = useSelector((state: AppState) => state)

  const { regime, nonce, mint } =
    daoData[daoAddress] ||
    ({
      regime: {},
      mint: SystemProgram.programId,
    } as DaoData)
  const members = useMembers(daoAddress)

  const findProposal = useCallback(async () => {
    if (nonce === undefined || !account.isAddress(daoAddress)) return
    const proposalAddress = await interDao.deriveProposalAddress(
      daoAddress,
      nonce,
    )
    return setProposalAddress(proposalAddress)
  }, [daoAddress, nonce])

  useEffect(() => {
    findProposal()
  }, [findProposal])

  return (
    <Row gutter={[16, 16]} wrap={false}>
      <Col>
        <GradientAvatar seed={proposalAddress} avatarProps={{ size: 48 }} />
      </Col>
      <Col>
        <Space size={0} direction="vertical">
          <Typography.Title level={5}>
            {shortenAddress(proposalAddress)}
          </Typography.Title>
          <Typography.Text type="secondary">
            {`Proposal #${Number(nonce) + 1}`}
          </Typography.Text>
        </Space>
      </Col>
      <Col>
        <Divider type="vertical" style={{ height: '100%' }} />
      </Col>
      <Col flex="auto">
        <Row gutter={[36, 36]}>
          <Col>
            <StatisticCard
              title="DAO Address"
              value={shortenAddress(daoAddress)}
            />
          </Col>
          <Col>
            <StatisticCard
              title="Token"
              value={
                <Space>
                  <MintAvatar mintAddress={mint.toBase58()} />
                  <MintSymbol mintAddress={mint.toBase58()} />
                </Space>
              }
            />
          </Col>
          <Col>
            <StatisticCard
              title="Members"
              value={numeric(members).format('0,0')}
            />
          </Col>
          <Col>
            <StatisticCard
              title="Regime"
              value={<RegimeTag regime={regime} />}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default ProposalPreview
