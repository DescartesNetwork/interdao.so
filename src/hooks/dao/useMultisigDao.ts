import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CID } from 'ipfs-core'
import BN from 'bn.js'
import { account, DEFAULT_EMPTY_ADDRESS } from '@senswap/sen-js'
import { useWallet } from '@sentre/senhub'
import { util } from '@sentre/senhub'

import IPFS from 'helpers/ipfs'
import { AppState } from 'model'
import configs from 'configs'
import MultisigWallet from 'helpers/mutisigWallet'
import Distributor from 'helpers/distributor'
import usePDB from '../usePDB'
import { deriveDaoNameURL } from './useDaoNameUrl'

const {
  sol: { interDao },
  manifest: { appId },
} = configs

const useMultisigDao = () => {
  const [loading, setLoading] = useState(false)
  const createDaoData = useSelector((state: AppState) => state.createDao.data)
  const metadata = useSelector(
    (state: AppState) => state.createDao.data.metadata,
  )
  const pdb = usePDB()
  const history = useHistory()
  const {
    wallet: { address: myWallet },
  } = useWallet()
  const daoNameUrl = deriveDaoNameURL(metadata.daoName)

  const createVotingMint = useCallback(async () => {
    const { members } = metadata
    const multiSigWallet = new MultisigWallet(DEFAULT_EMPTY_ADDRESS)
    const mintAddress = await multiSigWallet.createNewTokenAndMintTo(
      members.length,
    )
    return mintAddress.toBase58()
  }, [metadata])

  const getDistributorAddress = useCallback(
    async (mintAddress: string) => {
      const { members, daoType } = metadata
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
    [metadata, myWallet],
  )

  const createMultisigDao = useCallback(async () => {
    try {
      setLoading(true)
      const { regime, isPublic, isNft } = createDaoData
      const mintAddress = await createVotingMint()
      const distributorAddress = await getDistributorAddress(mintAddress)
      const ipfs = new IPFS()
      const cid = await ipfs.set({ ...metadata, distributorAddress })
      const {
        multihash: { digest },
      } = CID.parse(cid)
      const metadataBuff = Buffer.from(digest)
      const { members } = metadata
      const totalSupply = new BN(members.length)
      const { txId, daoAddress } = await interDao.initializeDao(
        mintAddress,
        totalSupply,
        metadataBuff,
        undefined, // Optional DAO's keypair
        regime,
        isNft,
        isPublic,
      )

      await pdb.setItem(daoAddress, {
        ...metadata,
        distributorAddress,
        cid,
      }) // to realtime
      window.notify({
        type: 'success',
        description: 'A new DAO is created. Click here to view details.',
        onClick: () => window.open(util.explorer(txId), '_blank'),
      })
      return history.push(`/app/${appId}/dao/${daoAddress}/${daoNameUrl}`)
    } catch (er: any) {
      window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
  }, [
    createDaoData,
    createVotingMint,
    getDistributorAddress,
    metadata,
    pdb,
    history,
    daoNameUrl,
  ])

  return { createMultisigDao, loading }
}

export default useMultisigDao
