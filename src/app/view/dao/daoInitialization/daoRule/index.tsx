import BN from 'bn.js'
import { web3 } from '@project-serum/anchor'
import { DaoRegime } from '@interdao/core'

import { Col, Row } from 'antd'
import RegimeInput from './regimeInput'
import CirculatingSupplyInput from './circulatingSupplyInput'
import TokenAddressInput from './tokenAddressInput'

export type DaoDataProps = {
  mintAddress: string
  supply: BN
  metadata?: Buffer
  dao?: web3.Keypair
  regime: DaoRegime
}

const DaoRule = ({
  daoData,
  setDaoData,
}: {
  daoData: DaoDataProps
  setDaoData: (daoData: DaoDataProps) => void
}) => {
  const { mintAddress, supply, regime } = daoData

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <RegimeInput
          value={regime}
          onChange={(regime) => setDaoData({ ...daoData, regime })}
        />
      </Col>
      <Col span={24}>
        <TokenAddressInput
          value={mintAddress}
          onChange={(mintAddress) => setDaoData({ ...daoData, mintAddress })}
        />
      </Col>
      <Col span={24}>
        <CirculatingSupplyInput
          mintAddress={mintAddress}
          value={supply?.toString()}
          onChange={(supply) =>
            setDaoData({ ...daoData, supply: new BN(supply) })
          }
        />
      </Col>
    </Row>
  )
}

export default DaoRule
