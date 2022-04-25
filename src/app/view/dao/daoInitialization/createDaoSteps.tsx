import { forwardRef, useImperativeHandle, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { account } from '@senswap/sen-js'
import { CID } from 'ipfs-core'
import { BN } from 'bn.js'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import IPFS from 'shared/pdb/ipfs'

import ChooseDaoType from './chooseDaoType'
import ConfirmCreate from './confirmCreate'
import DaoRule, { DaoDataProps } from './daoRule'
import MetaDataForm, { MetaData } from './metaDataForm'
import { CreateDaoTitleProps } from './createDaoProgress'

import { explorer } from 'shared/util'
import configs from 'app/configs'

const {
  sol: { interDao },
  manifest: { appId },
} = configs

const DEFAULT_METADATA = {
  daoName: '',
  description: '',
  image: '',
  optionals: [],
}

const DEFAULT_DAO_DATA = {
  mintAddress: '',
  supply: new BN(0),
  metadata: undefined,
  dao: undefined,
  regime: {},
}

export enum CreateSteps {
  stepOne = 1,
  stepTwo = 2,
  stepThree = 3,
}
export type CreateStepsHandle = {
  uploadMetaData: () => Promise<string>
  createDao: (cid: string) => void
  validDaoData: (cid: string) => Promise<boolean>
  validMetaData: () => Promise<boolean>
}

const CreateDaoSteps = forwardRef<CreateStepsHandle, CreateDaoTitleProps>(
  ({ step }, ref) => {
    const [cid, setCid] = useState('')
    const [metaData, setMetaData] = useState<MetaData>(DEFAULT_METADATA)
    const [daoData, setDaoData] = useState<DaoDataProps>(DEFAULT_DAO_DATA)
    const { mintAddress, regime, supply } = daoData
    const { daoName, description, image } = metaData
    const decimals = useMintDecimals(mintAddress) || 0
    const history = useHistory()

    const validDao = useMemo(() => {
      if (!account.isAddress(mintAddress)) return false
      if (!supply || !Number(supply)) return false
      if (!decimals) return false
      return true
    }, [decimals, mintAddress, supply])

    const validMetaData = useMemo(() => {
      return !!daoName && !!description && !!image
    }, [daoName, description, image])

    useImperativeHandle(ref, () => ({
      async uploadMetaData() {
        try {
          const ipfs = new IPFS()
          const cid = await ipfs.set(metaData)
          return cid
        } catch (er: any) {
          return ''
        }
      },
      async validDaoData(cid: string) {
        setCid(cid)
        return validDao
      },
      async validMetaData() {
        setCid(cid)
        return validMetaData
      },
      async createDao(cid: string) {
        try {
          if (!validDao) return
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
        } catch (er: any) {
          return window.notify({
            type: 'error',
            description: er.message,
          })
        }
      },
    }))

    if (step === CreateSteps.stepOne)
      return <MetaDataForm metaData={metaData} setMetaData={setMetaData} />
    if (step === CreateSteps.stepTwo)
      return <DaoRule daoData={daoData} setDaoData={setDaoData} />
    if (step === CreateSteps.stepThree)
      return <ConfirmCreate daoData={daoData} cid={cid} />
    return <ChooseDaoType onSelected={() => {}} />
  },
)

export default CreateDaoSteps
