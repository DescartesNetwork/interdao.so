import { useSelector } from 'react-redux'
import { DaoData } from '@interdao/core'
import { SystemProgram } from '@solana/web3.js'
import { util } from '@sentre/senhub'

import { Col, Row, Space } from 'antd'
import { MintAvatar, MintSymbol } from '@sen-use/app'
import StatisticCard from 'components/ui/statisticCard'
import RegimeTag from 'components/regimeTag'
import DaoMember from 'components/dao/daoMember'

import { AppState } from 'model'

export type ProposalPreviewProps = {
  daoAddress: string
}

const ProposalPreview = ({ daoAddress }: ProposalPreviewProps) => {
  const daos = useSelector((state: AppState) => state.daos)
  const { regime, mint } =
    daos[daoAddress] ||
    ({
      regime: {},
      mint: SystemProgram.programId,
    } as DaoData)

  return (
    <Row gutter={[36, 16]}>
      <Col xs={12} md={5}>
        <StatisticCard
          title="DAO Address"
          value={util.shortenAddress(daoAddress)}
        />
      </Col>
      <Col xs={12} md={5}>
        <StatisticCard
          title="Vote By"
          value={
            <Space>
              <MintAvatar mintAddress={mint.toBase58()} />
              <MintSymbol mintAddress={mint.toBase58()} />
            </Space>
          }
        />
      </Col>
      <Col xs={12} md={5}>
        <StatisticCard
          title="Members"
          value={<DaoMember daoAddress={daoAddress} />}
        />
      </Col>
      <Col xs={12} md={5}>
        <StatisticCard title="Regime" value={<RegimeTag regime={regime} />} />
      </Col>
    </Row>
  )
}

export default ProposalPreview
