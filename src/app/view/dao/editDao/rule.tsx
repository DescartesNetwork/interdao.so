import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { account, utils } from '@senswap/sen-js'
import { BN } from 'bn.js'
import { SystemProgram } from '@solana/web3.js'
import { CID } from 'ipfs-core'

import { Col, Row } from 'antd'
import DaoRule from '../daoInitialization/flexibleDAO/daoRule'
import ActionButton from './actionButton'
import MultiSigDAORule from '../daoInitialization/multisigDAO/daoRule'

import { AppDispatch, AppState } from 'app/model'
import { CreateDaoData, setCreateDaoData } from 'app/model/dao.controller'
import configs from 'app/configs'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { explorer } from 'shared/util'
import useMetaData from 'app/hooks/useMetaData'
import IPFS from 'shared/pdb/ipfs'
import MultisigWallet from 'app/helpers/mutisigWallet'

const {
  sol: { interDao },
} = configs

const RuleMultisig = ({ daoAddress }: { daoAddress: string }) => {
  const [loading, setLoading] = useState(false)
  const {
    metadata: { createMetaData },
    dao: { daoData },
  } = useSelector((state: AppState) => state)

  const validAccount = async (walletAddress: string, mintAddress: string) => {
    try {
      const { splt } = window.sentre
      const associatedAddress = await splt.deriveAssociatedAddress(
        walletAddress,
        mintAddress,
      )
      const data = await splt.getAccountData(associatedAddress)
      if (data) return false
    } catch (error) {
      return true
    }
  }

  const updateMember = async () => {
    const { mint } = daoData?.[daoAddress]
    const { members } = createMetaData
    const mintAddress = mint.toBase58()
    try {
      setLoading(true)
      const ipfs = new IPFS()
      const cid = await ipfs.set(createMetaData)
      const {
        multihash: { digest },
      } = CID.parse(cid)
      const daoMetaData = Buffer.from(digest)
      const { txId } = await interDao.updateDaoMetadata(daoMetaData, daoAddress)
      const multisigWallet = new MultisigWallet(mintAddress)

      for (const { walletAddress } of members) {
        const isValid = await validAccount(walletAddress, mintAddress)
        if (!isValid) continue
        const walletPubkey = account.fromAddress(walletAddress)
        await multisigWallet.mintToAccount(walletPubkey)
      }

      return window.notify({
        type: 'success',
        description:
          'Update information successfully. Click here to view details',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <MultiSigDAORule />
      </Col>
      <Col span={24}>
        <ActionButton
          loading={loading}
          onSave={updateMember}
          daoAddress={daoAddress}
        />
      </Col>
    </Row>
  )
}

const RuleFlexible = ({ daoAddress }: { daoAddress: string }) => {
  const [loading, setLoading] = useState(false)
  const {
    dao: { daoData, createDaoData },
  } = useSelector((state: AppState) => state)
  const { mint } = daoData[daoAddress]
  const decimals = useMintDecimals(mint.toBase58()) || 0

  const onUpdate = async () => {
    const { regime, supply } = createDaoData
    if (!regime || !supply) return
    try {
      setLoading(true)

      const { txId } = await interDao.updateDaoRegime(regime, daoAddress)
      window.notify({
        type: 'success',
        description: 'Update regime successfully. Click here to view details',
        onClick: () => window.open(explorer(txId), '_blank'),
      })

      const { txId: txIdSupply } = await interDao.updateDaoSupply(
        supply.mul(new BN(10).pow(new BN(decimals))),
        daoAddress,
      )
      return window.notify({
        type: 'success',
        description: 'Update supply successfully. Click here to view details',
        onClick: () => window.open(explorer(txIdSupply), '_blank'),
      })
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <DaoRule />
      </Col>
      <Col span={24}>
        <ActionButton
          loading={loading}
          onSave={onUpdate}
          daoAddress={daoAddress}
        />
      </Col>
    </Row>
  )
}

const Rule = ({ daoAddress }: { daoAddress: string }) => {
  const {
    dao: { daoData },
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
    const nextData: CreateDaoData = {
      mintAddress: mint.toBase58(),
      supply: new BN(utils.undecimalize(BigInt(supply.toNumber()), decimals)),
      regime,
    }
    return dispatch(setCreateDaoData(nextData))
  }, [daoAddress, decimals, dispatch, mint, regime, supply])

  useEffect(() => {
    setDefaultValue()
  }, [setDefaultValue])

  return metaData?.daoType === 'multisig-dao' ? (
    <RuleMultisig daoAddress={daoAddress} />
  ) : (
    <RuleFlexible daoAddress={daoAddress} />
  )
}

export default Rule
