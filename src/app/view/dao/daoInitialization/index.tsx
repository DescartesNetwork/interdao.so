import { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import IPFS from 'shared/pdb/ipfs'
import { CID } from 'ipfs-core'
import { BN } from 'bn.js'
import { account, DEFAULT_EMPTY_ADDRESS } from '@senswap/sen-js'

import { Row, Col, Card } from 'antd'
import InitDAOContainer, { CreateSteps } from './initDAOContainer'
import InitDAOHeader from './initDAOHeader'
import ActionButton from './actions'

import { AppState } from 'app/model'
import { explorer } from 'shared/util'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import MultisigWallet from 'app/helpers/mutisigWallet'
import configs from 'app/configs'

import './index.less'
import usePDB from 'app/hooks/usePDB'

const {
  sol: { interDao },
  manifest: { appId },
} = configs

const DaoInitialization = () => {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const initMetadata = useSelector(
    (state: AppState) => state.metadata.initMetadata,
  )
  const initDao = useSelector((state: AppState) => state.dao.initDao)
  const history = useHistory()
  const { mintAddress, supply, regime } = initDao
  const decimals = useMintDecimals(mintAddress) || 0
  const pdb = usePDB()

  const onNextStep = useCallback(async () => {
    try {
      if (step === CreateSteps.stepOne && !initMetadata)
        throw new Error('Invalid Metadata')
      if (step === CreateSteps.stepTwo && !initDao)
        throw new Error('Invalid DAO data')
      return setStep(step + 1)
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    }
  }, [initDao, initMetadata, step])

  const disabled = useMemo(() => {
    const { daoName, image, daoType, members, description } = initMetadata
    if (step === CreateSteps.stepOne) return !daoName || !image || !description

    if (step === CreateSteps.stepTwo && daoType === 'flexible-dao')
      return !mintAddress || !regime || !Number(supply)

    if (step === CreateSteps.stepTwo && daoType === 'multisig-dao' && members) {
      let valid = false
      for (const member of members) {
        const { name, walletAddress } = member
        if (!name || !account.isAddress(walletAddress)) {
          valid = true
          break
        }
      }
      return valid
    }
  }, [initMetadata, mintAddress, regime, step, supply])

  const getMintAddr = useCallback(async () => {
    const { members } = initMetadata
    if (mintAddress || !members) return mintAddress
    try {
      const multiSigWallet = new MultisigWallet(DEFAULT_EMPTY_ADDRESS)
      await multiSigWallet.createNewToken()

      for (const { walletAddress } of members) {
        await multiSigWallet.mintToAccount(account.fromAddress(walletAddress))
      }

      return multiSigWallet.getMintAddress()
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
      return ''
    }
  }, [initMetadata, mintAddress])

  const onCreateDao = useCallback(async () => {
    try {
      setLoading(true)
      const ipfs = new IPFS()
      const cid = await ipfs.set(initMetadata)
      const {
        multihash: { digest },
      } = CID.parse(cid)
      const metadata = Buffer.from(digest)
      const { members, daoType } = initMetadata
      const totalSupply =
        daoType === 'flexible-dao'
          ? supply.mul(new BN(10).pow(new BN(decimals)))
          : new BN(members.length)

      const mintAddress = await getMintAddr()

      const { txId, daoAddress } = await interDao.initializeDao(
        mintAddress,
        totalSupply,
        metadata,
        undefined, // Optional DAO's keypair
        regime,
      )
      await pdb.setItem(daoAddress, initMetadata) // to realtime
      window.notify({
        type: 'success',
        description: 'A new DAO is created. Click here to view details.',
        onClick: () => window.open(explorer(txId), '_blank'),
      })
      return history.push(`/app/${appId}/dao/${daoAddress}`)
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }, [initMetadata, supply, decimals, getMintAddr, regime, pdb, history])

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} lg={16}>
        <Card bordered={false}>
          <Row gutter={[24, 32]}>
            <Col span={24}>
              <InitDAOHeader step={step} />
            </Col>
            <Col span={24}>
              <InitDAOContainer step={step} />
            </Col>
            <Col span={24}>
              <ActionButton
                step={step}
                onHandleStep={onNextStep}
                onConfirm={onCreateDao}
                loading={loading}
                disabled={disabled}
                setStep={() => setStep(step - 1)}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default DaoInitialization
