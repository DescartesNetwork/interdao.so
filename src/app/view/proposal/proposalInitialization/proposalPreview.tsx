import { useSelector } from 'react-redux'
import { DaoData } from '@interdao/core'
import { SystemProgram } from '@solana/web3.js'

import { Col, Row, Space } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import StatisticCard from 'app/components/statisticCard'
import RegimeTag from 'app/components/regimeTag'

import { AppState } from 'app/model'
import { numeric, shortenAddress } from 'shared/util'
import useMembers from 'app/hooks/useMembers'

export type ProposalPreviewProps = {
  daoAddress: string
}

const ProposalPreview = ({ daoAddress }: ProposalPreviewProps) => {
  const {
    dao: { daos },
  } = useSelector((state: AppState) => state)

  const { regime, mint } =
    daos[daoAddress] ||
    ({
      regime: {},
      mint: SystemProgram.programId,
    } as DaoData)
  const members = useMembers(daoAddress)

  return (
    <Row gutter={[36, 16]}>
      <Col xs={12} md={5}>
        <StatisticCard title="DAO Address" value={shortenAddress(daoAddress)} />
      </Col>
      <Col xs={12} md={5}>
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
      <Col xs={12} md={5}>
        <StatisticCard title="Members" value={numeric(members).format('0,0')} />
      </Col>
      <Col xs={12} md={5}>
        <StatisticCard title="Regime" value={<RegimeTag regime={regime} />} />
      </Col>
    </Row>
  )
}

export default ProposalPreview
