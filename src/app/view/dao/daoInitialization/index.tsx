import { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import IPFS from 'shared/pdb/ipfs'
import { CID } from 'ipfs-core'
import { BN } from 'bn.js'
import { account } from '@senswap/sen-js'

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

const {
  sol: { interDao },
  manifest: { appId },
} = configs

const DaoInitialization = () => {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const {
    dao: { createDaoData, daoType },
    metadata: { createMetaData },
  } = useSelector((state: AppState) => state)
  const history = useHistory()
  const { mintAddress, supply, regime } = createDaoData
  const { members } = createMetaData
  const decimals = useMintDecimals(mintAddress) || 0

  const onNextStep = useCallback(async () => {
    try {
      if (step === CreateSteps.stepOne && !createMetaData)
        throw new Error('Invalid Metadata')
      if (step === CreateSteps.stepTwo && !createDaoData)
        throw new Error('Invalid DAO data')
      return setStep(step + 1)
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    }
  }, [createDaoData, createMetaData, step])

  const disabled = useMemo(() => {
    if (step === CreateSteps.stepOne)
      return (
        !createMetaData.daoName ||
        !createMetaData.image ||
        !createMetaData.description
      )

    if (step === CreateSteps.stepTwo && daoType === 'flexible-dao')
      return (
        !createDaoData.mintAddress ||
        !createDaoData.regime ||
        !Number(createDaoData.supply)
      )

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
  }, [createDaoData, createMetaData, step, daoType, members])

  const getMintAddr = useCallback(async () => {
    if (mintAddress || !members) return mintAddress
    try {
      const multiSigWallet = new MultisigWallet()
      await multiSigWallet.createNewToken()

      for (const { walletAddress } of members) {
        await multiSigWallet.mintToAccount(account.fromAddress(walletAddress))
      }

      return multiSigWallet.getMintAddress()
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
      return ''
    }
  }, [members, mintAddress])

  const onCreateDao = useCallback(async () => {
    try {
      setLoading(true)
      const ipfs = new IPFS()
      const cid = await ipfs.set(createMetaData)
      const {
        multihash: { digest },
      } = CID.parse(cid)
      const metadata = Buffer.from(digest)

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
  }, [
    createMetaData,
    daoType,
    supply,
    decimals,
    members,
    getMintAddr,
    regime,
    history,
  ])

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
