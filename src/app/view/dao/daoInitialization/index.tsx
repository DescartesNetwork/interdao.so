import { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import IPFS from 'shared/pdb/ipfs'
import { CID } from 'ipfs-core'
import { BN } from 'bn.js'

import { Row, Col, Card } from 'antd'
import CreateDaoSteps, { CreateSteps } from './createDaoSteps'
import CreateDaoProgress from './createDaoProgress'
import BackAction from './actions/backAction'
import ContinuesAction from './actions/continuesAction'

import { AppState } from 'app/model'
import { explorer } from 'shared/util'
import useMintDecimals from 'shared/hooks/useMintDecimals'

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
    dao: { createDaoData },
    metadata: { createMetaData },
  } = useSelector((state: AppState) => state)
  const history = useHistory()

  const { mintAddress, supply, regime } = createDaoData
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

  const disabled = useMemo(
    () =>
      (step === CreateSteps.stepOne &&
        (!createMetaData.daoName ||
          !createMetaData.image ||
          !createMetaData.description)) ||
      (step === CreateSteps.stepTwo &&
        (!createDaoData.mintAddress ||
          !createDaoData.regime ||
          !Number(createDaoData.supply))),
    [createDaoData, createMetaData, step],
  )

  const onCreateDao = useCallback(async () => {
    try {
      setLoading(true)
      const ipfs = new IPFS()
      const cid = await ipfs.set(createMetaData)
      const {
        multihash: { digest },
      } = CID.parse(cid)
      const metadata = Buffer.from(digest)

      const totalSupply = supply.mul(new BN(10).pow(new BN(decimals)))

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
    } catch (err: any) {
      window.notify({ type: 'error', description: err.message })
    } finally {
      setLoading(false)
    }
  }, [createMetaData, decimals, history, mintAddress, regime, supply])

  return (
    <Row gutter={[24, 24]} justify="center">
      <Col xs={24} lg={16}>
        <Card bordered={false}>
          <Row gutter={[24, 32]}>
            <Col span={24}>
              <CreateDaoProgress step={step} />
            </Col>
            <Col span={24}>
              <CreateDaoSteps step={step} />
            </Col>
            <Col span={24} />
            <Col flex="auto">
              <BackAction step={step} onHandleStep={() => setStep(step - 1)} />
            </Col>
            <Col>
              <ContinuesAction
                step={step}
                onHandleStep={onNextStep}
                onConfirm={onCreateDao}
                loading={loading}
                disabled={disabled}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default DaoInitialization
