import { useMemo } from 'react'
import { FeeOptions } from '@interdao/core'
import { BN } from 'bn.js'

import configs from 'configs'
import { useDaoData } from '../dao'

type useProposalFeeProps = {
  daoAddress: string
}

const {
  sol: { taxman, fee },
} = configs

const useProposalFee = ({ daoAddress }: useProposalFeeProps) => {
  const daoData = useDaoData(daoAddress)

  const proposalFee = useMemo(() => {
    if (!daoData?.regime || !daoData?.authority) return
    const parseRegime = Object.keys(daoData.regime)[0]
    const revenueFee = parseRegime === 'democratic' ? new BN(0) : new BN(fee)
    const feeOption: FeeOptions = {
      tax: new BN(fee),
      taxmanAddress: taxman,
      revenue: revenueFee,
      revenuemanAddress: daoData.authority.toBase58(),
    }

    return feeOption
  }, [daoData])

  return proposalFee
}

export default useProposalFee
