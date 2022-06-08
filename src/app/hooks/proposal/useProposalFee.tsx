import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { DaoData, FeeOptions } from '@interdao/core'
import { BN } from 'bn.js'

import configs from 'app/configs'
import { AppState } from 'app/model'

type useProposalFeeProps = {
  daoAddress: string
}

const {
  sol: { taxman, fee },
} = configs

const useProposalFee = ({ daoAddress }: useProposalFeeProps) => {
  const daos = useSelector((state: AppState) => state.daos)
  const { regime, authority } = daos[daoAddress] || ({} as DaoData)

  const parseRegime = useMemo(() => {
    if (!regime) return ''
    return Object.keys(regime)[0]
  }, [regime])

  const proposalFee = useMemo(() => {
    if (!parseRegime || !authority) return

    const feeOption: FeeOptions = {
      tax: new BN(fee),
      taxmanAddress: taxman,
      revenue: new BN(fee),
      revenuemanAddress: authority.toBase58(),
    }

    if (parseRegime === 'democratic')
      return {
        tax: new BN(0),
        taxmanAddress: taxman,
        revenue: new BN(0),
        revenuemanAddress: authority.toBase58(),
      }

    return feeOption
  }, [authority, parseRegime])

  return proposalFee
}

export default useProposalFee
