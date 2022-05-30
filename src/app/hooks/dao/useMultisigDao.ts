import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CID } from 'ipfs-core'
import BN from 'bn.js'
import { account, DEFAULT_EMPTY_ADDRESS } from '@senswap/sen-js'
import { useWallet } from '@senhub/providers'

import IPFS from 'shared/pdb/ipfs'
import { explorer } from 'shared/util'
import { AppState } from 'app/model'
import configs from 'app/configs'
import MultisigWallet from 'app/helpers/mutisigWallet'
import Distributor from 'app/helpers/distributor'
import usePDB from '../usePDB'

const {
  sol: { interDao },
  manifest: { appId },
} = configs

const useMultisigDao = () => {
  const [loading, setLoading] = useState(false)
  const initDao = useSelector((state: AppState) => state.dao.initDao)
  const initMetadata = useSelector(
    (state: AppState) => state.metadata.initMetadata,
  )
  const { regime, isPublic, isNFT } = initDao
  const pdb = usePDB()
  const history = useHistory()
  const {
    wallet: { address: myWallet },
  } = useWallet()

  const getMintAddr = useCallback(async () => {
    const { members } = initMetadata
    const multiSigWallet = new MultisigWallet(DEFAULT_EMPTY_ADDRESS)
    const mintAddress = await multiSigWallet.createNewToken()
    await multiSigWallet.mintToAccount(myWallet, members.length)

    return mintAddress
  }, [initMetadata, myWallet])

  const getDistributorAddress = useCallback(
    async (mintAddress: string) => {
      const { members, daoType } = initMetadata
      if (daoType === 'flexible-dao') return ''
      const distributor = new Distributor()
      const pubKeys = members
        .filter(({ walletAddress }) => walletAddress !== myWallet)
        .map(({ walletAddress }) => account.fromAddress(walletAddress))

      const distributorAddress = await distributor.createDistributor(
        pubKeys,
        mintAddress,
      )
      return distributorAddress
    },
    [initMetadata, myWallet],
  )

  const createMultisigDao = useCallback(async () => {
    try {
      setLoading(true)
      const mintAddress = await getMintAddr()
      const distributorAddress = await getDistributorAddress(mintAddress)
      const ipfs = new IPFS()
      const cid = await ipfs.set({ ...initMetadata, distributorAddress })
      const {
        multihash: { digest },
      } = CID.parse(cid)
      const metadata = Buffer.from(digest)
      const { members } = initMetadata
      const totalSupply = new BN(members.length)
      const { txId, daoAddress } = await interDao.initializeDao(
        mintAddress,
        totalSupply,
        metadata,
        undefined, // Optional DAO's keypair
        regime,
        isPublic,
        isNFT,
      )

      await pdb.setItem(daoAddress, {
        ...initMetadata,
        distributorAddress,
        cid,
      }) // to realtime
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
    getMintAddr,
    getDistributorAddress,
    initMetadata,
    regime,
    isPublic,
    isNFT,
    pdb,
    history,
  ])

  return { createMultisigDao, loading }
}

export default useMultisigDao
