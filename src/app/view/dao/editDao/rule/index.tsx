import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account, utils } from '@senswap/sen-js'
import { SystemProgram } from '@solana/web3.js'
import { BN } from 'bn.js'

import EditMultisigDaoRule from './editMultisigDaoRule'
import EditFlexibleDaoRule from './editFlexibleDaoRule'

import { AppDispatch, AppState } from 'app/model'
import { InitDao, setInitDao } from 'app/model/dao.controller'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import useMetaData from 'app/hooks/useMetaData'

const Rule = ({ daoAddress }: { daoAddress: string }) => {
  const {
    dao: { daos: daoData },
  } = useSelector((state: AppState) => state)
  const { mint, regime, supply } = daoData?.[daoAddress] || {
    regime: {},
    supply: new BN(0),
    mint: SystemProgram.programId,
  }
  const decimals = useMintDecimals(mint.toBase58()) || 0
  const dispatch = useDispatch<AppDispatch>()
  const metaData = useMetaData(daoAddress)

  const setDefaultValue = useCallback(() => {
    if (!account.isAddress(daoAddress)) return
    const nextData: InitDao = {
      mintAddress: mint.toBase58(),
      supply: new BN(utils.undecimalize(BigInt(supply.toNumber()), decimals)),
      regime,
    }
    return dispatch(setInitDao(nextData))
  }, [daoAddress, decimals, dispatch, mint, regime, supply])

  useEffect(() => {
    setDefaultValue()
  }, [setDefaultValue])

  return metaData?.daoType === 'multisig-dao' ? (
    <EditMultisigDaoRule daoAddress={daoAddress} />
  ) : (
    <EditFlexibleDaoRule daoAddress={daoAddress} />
  )
}

export default Rule
