import { useSelector } from 'react-redux'
import { DaoData } from '@interdao/core'
import { SystemProgram } from '@solana/web3.js'

import { Col, Row, Space } from 'antd'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import StatisticCard from 'app/components/statisticCard'
import RegimeTag from 'app/components/regimeTag'
import AvatarNFT from 'app/components/avatarNFT'
import DaoMember from 'app/components/dao/daoMember'

import { AppState } from 'app/model'
import { shortenAddress } from 'shared/util'

export type ProposalPreviewProps = {
  daoAddress: string
}

const ProposalPreview = ({ daoAddress }: ProposalPreviewProps) => {
  const daos = useSelector((state: AppState) => state.daos)
  const { regime, mint, isNft } =
    daos[daoAddress] ||
    ({
      regime: {},
      mint: SystemProgram.programId,
    } as DaoData)

  return (
    <Row gutter={[36, 16]}>
      <Col xs={12} md={5}>
        <StatisticCard title="DAO Address" value={shortenAddress(daoAddress)} />
      </Col>
      <Col xs={12} md={5}>
        <StatisticCard
          title="Vote By"
          value={
            isNft ? (
              <AvatarNFT mintAddress={mint.toBase58()} />
            ) : (
              <Space>
                <MintAvatar mintAddress={mint.toBase58()} />
                <MintSymbol mintAddress={mint.toBase58()} />
              </Space>
            )
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
